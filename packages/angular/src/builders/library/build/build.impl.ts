import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { stripIndents } from '@angular-devkit/core/src/utils/literals';
import * as ng from '@angular/compiler-cli';
import { readJsonFile } from '@nrwl/workspace';
import {
  createProjectGraph,
  ProjectGraphNode,
  ProjectType
} from '@nrwl/workspace/src/core/project-graph';
import { fileExists, writeJsonFile } from '@nrwl/workspace/src/utils/fileutils';
import { join, resolve } from 'path';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';

export interface BuildAngularLibraryBuilderOptions {
  /**
   * The file path for the ng-packagr configuration file, relative to the current workspace.
   */
  project: string;
  /**
   * The full path for the TypeScript configuration file, relative to the current workspace.
   */
  tsConfig?: string;
  /**
   * Run build when files change.
   */
  watch?: boolean;

  /**
   * Automatically build all the dependent libraries first
   */
  withDeps?: boolean;
}

type DependentLibraryNode = {
  scope: string;
  outputPath: string;
  node: ProjectGraphNode;
};

/**
 * It is a prerequisite that dependent libraries have been built before the parent
 * library. This function checks that
 * @param context
 */
function checkDependentLibrariesHaveBeenBuilt(
  context: BuilderContext,
  projectDependencies: DependentLibraryNode[]
) {
  const depLibsToBuildFirst: DependentLibraryNode[] = [];

  // verify whether all dependent libraries have been built
  projectDependencies.forEach(libDep => {
    // check wether dependent library has been built => that's necessary
    const packageJsonPath = join(
      context.workspaceRoot,
      'dist',
      libDep.node.data.root,
      'package.json'
    );

    if (!fileExists(packageJsonPath)) {
      depLibsToBuildFirst.push(libDep);
    }
  });

  if (depLibsToBuildFirst.length > 0) {
    context.logger.error(stripIndents`
      Some of the library ${
        context.target.project
      }'s dependencies have not been built yet. Please build these libraries before:
      ${depLibsToBuildFirst.map(x => ` - ${x.scope}`).join('\n')}
    `);
    return { success: false };
  } else {
    return { success: true };
  }
}

async function initializeNgPackagr(
  options: BuildAngularLibraryBuilderOptions & JsonObject,
  context: BuilderContext,
  projectDependencies: DependentLibraryNode[]
): Promise<import('ng-packagr').NgPackagr> {
  const packager = (await import('ng-packagr')).ngPackagr();
  packager.forProject(resolve(context.workspaceRoot, options.project));

  if (options.tsConfig) {
    // read the tsconfig and modify its path in memory to
    // pass it on to ngpackagr
    const parsedTSConfig = ng.readConfiguration(options.tsConfig);

    // update the tsconfig.lib.json => we only do this in memory
    // and pass it along to ng-packagr
    projectDependencies.forEach(libDep => {
      parsedTSConfig.options.paths[libDep.scope] = [
        libDep.outputPath,
        ...parsedTSConfig.options.paths[libDep.scope]
      ];
    });

    packager.withTsConfig(parsedTSConfig);
  }

  return packager;
}

/**
 * Given a target library, uses the project dep graph to find all its dependencies
 * and calculates the `scope` name and output path
 * @param targetProj the target library to build
 */
export function calculateLibraryDependencies(
  context: BuilderContext
): DependentLibraryNode[] {
  const targetProj = context.target.project;
  const projGraph = createProjectGraph();

  // TODO: use the function from PR: https://github.com/nrwl/nx/pull/2297
  const hasArchitectBuildBuilder = (projectGraph: ProjectGraphNode): boolean =>
    projectGraph.data.architect &&
    projectGraph.data.architect.build &&
    projectGraph.data.architect.build.builder !== '';

  // gather the library dependencies
  return (projGraph.dependencies[targetProj] || [])
    .map(dependency => {
      const depNode = projGraph.nodes[dependency.target];

      if (
        depNode.type === ProjectType.lib &&
        hasArchitectBuildBuilder(depNode)
      ) {
        const libPackageJson = readJsonFile(
          join(context.workspaceRoot, depNode.data.root, 'package.json')
        );

        return {
          scope: libPackageJson.name, // i.e. @wrkspace/mylib
          outputPath: `dist/${depNode.data.root}`,
          node: depNode
        };
      } else {
        return null;
      }
    })
    .filter(x => !!x);
}

/**
 * Updates the peerDependencies section in the `dist/lib/xyz/package.json` with
 * the proper dependency and version
 */
function updatePackageJsonDependencies(
  context: BuilderContext,
  libDependencies: DependentLibraryNode[]
) {
  const targetProject = context.target.project;

  const projGraph = createProjectGraph();
  const targetProjNode = projGraph.nodes[targetProject];

  let distLibOutputPath = `dist/${targetProjNode.data.root}`;

  // if we have dependencies, update the `dependencies` section of the package.json
  const jsonOutputFile = `${distLibOutputPath}/package.json`;
  if (libDependencies && libDependencies.length > 0) {
    const outputJson = readJsonFile(jsonOutputFile);

    outputJson.dependencies = outputJson.dependencies || {};

    libDependencies.forEach(entry => {
      if (!outputJson.dependencies[entry.scope]) {
        // read the lib version (should we read the one from the dist?)
        const packageJsonPath = join(
          context.workspaceRoot,
          entry.node.data.root,
          'package.json'
        );
        const depNodePackageJson = readJsonFile(packageJsonPath);

        outputJson.dependencies[entry.scope] = depNodePackageJson.version;
      }
    });

    writeJsonFile(jsonOutputFile, outputJson);
  }
}

async function scheduleLibraryBuilds(
  options: BuildAngularLibraryBuilderOptions & JsonObject,
  context: BuilderContext,
  builds: DependentLibraryNode[]
) {
  let allBuildsSuccess = true;

  for (const b of builds) {
    // schedule a build
    const buildRun = await context.scheduleTarget(
      {
        project: b.node.name,
        target: 'build'
      },
      {
        // overwrite the withDeps prop as we probably want to pass that along to
        // child builds as well. otherwise it would be weird
        withDeps: options.withDeps
      }
    );

    // wait for the result
    const result = await buildRun.result;

    if (result.success === false) {
      allBuildsSuccess = false;

      // stop building other libs or 🤔 could we continue in some cases?
      break;
    }
  }

  return { success: allBuildsSuccess };
}

export function run(
  options: BuildAngularLibraryBuilderOptions & JsonObject,
  context: BuilderContext
): Observable<BuilderOutput> {
  return of({
    options,
    context,
    dependencies: calculateLibraryDependencies(context),
    result: { success: true }
  }).pipe(
    // verify param combination
    switchMap(buildProps => {
      if (
        buildProps.options.withDeps === true &&
        buildProps.options.watch === true
      ) {
        buildProps.context.logger.error(
          'Using --withDeps in combination with --watch is not supported'
        );
        // not allowed combination
        return of({
          ...buildProps,
          result: { success: false }
        });
      } else {
        return of(buildProps);
      }
    }),
    // determine whether to build dependencies based on the options
    switchMap(buildProps => {
      if (buildProps.result.success && buildProps.options.withDeps === true) {
        return from(
          scheduleLibraryBuilds(
            buildProps.options,
            buildProps.context,
            buildProps.dependencies
          )
        ).pipe(
          map(result => ({
            ...buildProps,
            result: result
          }))
        );
      } else {
        return of(buildProps);
      }
    }),
    // check whether dependent libraries have been built (esp usefule if --withDeps has not been used)
    switchMap(buildProps => {
      if (buildProps.result.success) {
        return of({
          ...buildProps,
          result: {
            ...checkDependentLibrariesHaveBeenBuilt(
              buildProps.context,
              buildProps.dependencies
            )
          }
        });
      } else {
        return of(buildProps);
      }
    }),
    // build the package
    switchMap(buildProps => {
      if (buildProps.result.success) {
        return from(
          initializeNgPackagr(
            buildProps.options,
            buildProps.context,
            buildProps.dependencies
          )
        ).pipe(
          switchMap(packager =>
            options.watch ? packager.watch() : packager.build()
          ),
          tap(() => {
            updatePackageJsonDependencies(
              buildProps.context,
              buildProps.dependencies
            );
          }),
          mapTo({ success: true })
        );
      } else {
        // just pass on the result
        return of({ success: buildProps.result.success });
      }
    })
  );
}

export default createBuilder<Record<string, string> & any>(run);
