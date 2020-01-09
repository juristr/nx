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
      let parentLib: string;
      let childLib: string;

      beforeEach(() => {
        parentLib = uniq('parentlib');
        childLib = uniq('childlib');

        // newProject();
        ensureProject();

        runCLI(
          `generate @nrwl/angular:library ${parentLib} --publishable=true --no-interactive`
        );
        runCLI(
          `generate @nrwl/angular:library ${childLib} --publishable=true --no-interactive`
        );

        // create an import dependency in parentLib
        updateFile(
          `libs/${parentLib}/src/lib/${parentLib}.module.ts`,
          `
            import { NgModule } from '@angular/core';
            import { CommonModule } from '@angular/common';
            import { ${toClassName(childLib)}Module } from '@proj/${childLib}';
            
            @NgModule({
              imports: [CommonModule, ${toClassName(childLib)}Module]
            })
            export class ${toClassName(parentLib)}Module {}          
          `
        );
      });

      // TODO: activate this test
      // it('should throw an error if the dependent library has not been built before building the parent lib', () => {
      //   // build the child before
      //   const parentLibOutput = runCLI(`build ${parentLib}`, {
      //     silenceError: true
      //   });
      //   expect(parentLibOutput).toContain(
      //     `Dependent library @proj/${childLib} has not been built. Please build that library before`
      //   );
      // });

      it('should properly build the parent lib referencing the child lib and update the package.json dependencies', () => {
        // build the child before
        const buildChildLibOutput = runCLI(`build ${childLib}`);
        expect(buildChildLibOutput).toContain(`Built @proj/${childLib}`);

        // build the child before
        const parentLibOutput = runCLI(`build ${parentLib}`);
        expect(parentLibOutput).toContain(`Built @proj/${parentLib}`);

        // assert package.json deps have been set
        const jsonFile = readJson(`dist/libs/${parentLib}/package.json`);
        const childDependencyVersion =
          jsonFile.dependencies[`@proj/${childLib}`];
        expect(childDependencyVersion).toBe('0.0.1');
      });
    });
  });
});
