import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import * as ng from '@angular/compiler-cli';
import { readJsonFile } from '@nrwl/workspace';
import {
  createProjectGraph,
  ProjectGraphNode,
  ProjectType
} from '@nrwl/workspace/src/core/project-graph';
import {
  writeJsonFile,
  directoryExists,
  fileExists
} from '@nrwl/workspace/src/utils/fileutils';
import { join, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { mapTo, switchMap, tap, map } from 'rxjs/operators';
import { JsonObject } from '@angular-devkit/core';
import { checkProjectExists } from '@nrwl/workspace/src/schematics/move/lib/check-project-exists';

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
}

async function initialize(
  options: BuildAngularLibraryBuilderOptions & JsonObject,
  context: BuilderContext
): Promise<import('ng-packagr').NgPackagr> {
  const packager = (await import('ng-packagr')).ngPackagr();
  packager.forProject(resolve(context.workspaceRoot, options.project));

  if (options.tsConfig) {
    // create a temporary modified tsconfig
    const parsedTSConfig = ng.readConfiguration(options.tsConfig);

    const projectDependencies = calculateLibraryDependencies(
      context.target.project
    );

    // update the tsconfig.lib.json => we only do this in memory
    // and pass it along to ng-packagr
    projectDependencies.forEach(libDep => {
      // check wether dependent library has been built => that's necessary
      const packageJsonPath = join(
        context.workspaceRoot,
        'dist',
        libDep.node.data.root,
        'package.json'
      );
      if (!fileExists(packageJsonPath)) {
        throw new Error(
          `Dependent library ${libDep.scope} has not been built. Please build that library before.`
        );
      }

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
function calculateLibraryDependencies(
  targetProj: string
): { scope: string; outputPath: string; node: ProjectGraphNode }[] {
  const projGraph = createProjectGraph();

  // TODO: use the function from PR: https://github.com/nrwl/nx/pull/2297
  const hasArchitectBuildBuilder = (projectGraph: ProjectGraphNode): boolean =>
    projectGraph.data.architect &&
    projectGraph.data.architect.build &&
    projectGraph.data.architect.build.builder !== '';

  // gather the library dependencies
  return projGraph.dependencies[targetProj]
    .map(dependency => {
      const depNode = projGraph.nodes[dependency.target];
      if (
        depNode.type === ProjectType.lib &&
        hasArchitectBuildBuilder(depNode)
      ) {
        return {
          scope: `@${depNode.data.prefix}/${depNode.name}`,
          outputPath:
            depNode.data.architect.build.options.outputPath ||
            `dist/${depNode.data.root}`,
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
function updatePackageJsonDependencies(context: BuilderContext) {
  const targetProject = context.target.project;
  const libDependencies = calculateLibraryDependencies(targetProject);

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

export function run(
  options: BuildAngularLibraryBuilderOptions & JsonObject,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(initialize(options, context)).pipe(
    switchMap(packager =>
      options.watch ? packager.watch() : packager.build()
    ),
    tap(() => {
      updatePackageJsonDependencies(context);
    }),
    mapTo({ success: true })
  );
}

export default createBuilder<Record<string, string> & any>(run);
