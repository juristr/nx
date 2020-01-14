import { toClassName } from '@nrwl/workspace';
import {
  ensureProject,
  forEachCli,
  readJson,
  runCLI,
  uniq,
  updateFile
} from './utils';

forEachCli('angular', cli => {
  describe('Build Library', () => {
    const workspace: string = cli === 'angular' ? 'angular' : 'workspace';

    describe('Build Angular library', () => {
      /**
       * Graph:
       *                               childChildLib
       *                             /
       *                 childLib =>
       *               /             \
       * parentLib =>                 \
       *               \                childLibShared
       *                \             /
       *                 childLib2 =>
       *
       */
      let parentLib: string;
      let childLib: string;
      let childChildLib: string;
      let childLib2: string;
      let childLibShared: string;

      beforeEach(() => {
        parentLib = uniq('parentlib');
        childLib = uniq('childlib');
        childChildLib = uniq('childchildlib');
        childLib2 = uniq('childlib2');
        childLibShared = uniq('childlibshared');

        ensureProject();

        runCLI(
          `generate @nrwl/angular:library ${parentLib} --publishable=true --no-interactive`
        );
        runCLI(
          `generate @nrwl/angular:library ${childLib} --publishable=true --no-interactive`
        );
        runCLI(
          `generate @nrwl/angular:library ${childLib2} --publishable=true --no-interactive`
        );
        runCLI(
          `generate @nrwl/angular:library ${childChildLib} --publishable=true --no-interactive`
        );
        runCLI(
          `generate @nrwl/angular:library ${childLibShared} --publishable=true --no-interactive`
        );

        // create dependencies by importing
        const createDep = (parent, children: string[]) => {
          updateFile(
            `libs/${parent}/src/lib/${parent}.module.ts`,
            `
              import { NgModule } from '@angular/core';
              import { CommonModule } from '@angular/common';
              ${children
                .map(
                  entry =>
                    `import { ${toClassName(
                      entry
                    )}Module } from '@proj/${entry}';`
                )
                .join('\n')}
              
              @NgModule({
                imports: [CommonModule, ${children
                  .map(entry => `${toClassName(entry)}Module`)
                  .join(',')}]
              })
              export class ${toClassName(parent)}Module {}          
            `
          );
        };
        debugger;

        createDep(parentLib, [childLib, childLib2]);
        createDep(childLib, [childChildLib, childLibShared]);
        createDep(childLib2, [childLibShared]);
      });

      it('should throw an error if the dependent library has not been built before building the parent lib', () => {
        expect.assertions(2);

        try {
          runCLI(`build ${parentLib}`);
        } catch (e) {
          expect(e.stderr.toString()).toContain(
            `Some of the library ${parentLib}'s dependencies have not been built yet. Please build these libraries before:`
          );
          expect(e.stderr.toString()).toContain(`@proj/${childLib}`);
        }
      });

      it('should automatically build all deps and update package.json when passing --withDeps flags', () => {
        const parentLibOutput = runCLI(`build ${parentLib} --withDeps`);

        expect(parentLibOutput).toContain(`Built @proj/${parentLib}`);
        expect(parentLibOutput).toContain(`Built @proj/${childLib}`);
        expect(parentLibOutput).toContain(`Built @proj/${childChildLib}`);
        expect(parentLibOutput).toContain(`Built @proj/${childLib2}`);
        expect(parentLibOutput).toContain(`Built @proj/${childLibShared}`);

        //   // assert package.json deps have been set
        const assertPackageJson = (
          parent: string,
          lib: string,
          version: string
        ) => {
          const jsonFile = readJson(`dist/libs/${parent}/package.json`);
          const childDependencyVersion = jsonFile.dependencies[`@proj/${lib}`];
          expect(childDependencyVersion).toBe(version);
        };

        assertPackageJson(parentLib, childLib, '0.0.1');
        assertPackageJson(childLib, childChildLib, '0.0.1');
        assertPackageJson(childLib, childLibShared, '0.0.1');
        assertPackageJson(childLib2, childLibShared, '0.0.1');
      });
    });
  });
});
