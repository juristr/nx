import * as path from 'path';
import {
  checkFilesExist,
  expectTestsPass,
  getSelectedPackageManager,
  getSize,
  killPorts,
  newProject,
  removeProject,
  runCLI,
  runCLIAsync,
  tmpProjPath,
  uniq,
  updateFile,
  runCypressTests,
} from '@nrwl/e2e/utils';

import { names } from '@nrwl/devkit';

describe('Angular Package', () => {
  let proj: string;

  beforeEach(() => (proj = newProject()));
  afterEach(() => removeProject({ onlyOnCI: true }));

  it('should work', async () => {
    // TODO: npm build is failing for Angular because of webpack 4
    // remove this condition once `node` is migrated to webpack 5
    if (getSelectedPackageManager() !== 'npm') {
      const myapp = uniq('myapp');
      const mylib = uniq('mylib');
      runCLI(
        `generate @nrwl/angular:app ${myapp} --directory=myDir --no-interactive`
      );
      runCLI(
        `generate @nrwl/angular:lib ${mylib} --directory=myDir --add-module-spec --no-interactive`
      );

      updateFile(
        `apps/my-dir/${myapp}/src/app/app.module.ts`,
        `
        import { NgModule } from '@angular/core';
        import { BrowserModule } from '@angular/platform-browser';
        import { MyDir${
          names(mylib).className
        }Module } from '@${proj}/my-dir/${mylib}';
        import { AppComponent } from './app.component';

        @NgModule({
          imports: [BrowserModule, MyDir${names(mylib).className}Module],
          declarations: [AppComponent],
          bootstrap: [AppComponent]
        })
        export class AppModule {}
      `
      );
      runCLI(`build my-dir-${myapp} --prod --output-hashing none`);

      checkFilesExist(`dist/apps/my-dir/${myapp}/main.js`);

      // This is a loose requirement because there are a lot of
      // influences external from this project that affect this.
      const es2015BundleSize = getSize(
        tmpProjPath(`dist/apps/my-dir/${myapp}/main.js`)
      );
      console.log(
        `The current es2015 bundle size is ${es2015BundleSize / 1000} KB`
      );
      expect(es2015BundleSize).toBeLessThanOrEqual(160000);

      // running tests for the app
      expectTestsPass(await runCLIAsync(`test my-dir-${myapp} --no-watch`));

      // running tests for the lib
      expectTestsPass(await runCLIAsync(`test my-dir-${mylib} --no-watch`));

      if (runCypressTests()) {
        const e2eResults = runCLI(
          `e2e my-dir-${myapp}-e2e --headless --no-watch`
        );
        expect(e2eResults).toContain('All specs passed!');
        expect(await killPorts()).toBeTruthy();
      }
    }
  }, 1000000);

  it('should support router config generation (lazy)', async () => {
    if (getSelectedPackageManager() !== 'npm') {
      const myapp = uniq('myapp');
      const mylib = uniq('mylib');
      runCLI(`generate @nrwl/angular:app ${myapp} --directory=myDir --routing`);
      runCLI(
        `generate @nrwl/angular:lib ${mylib} --directory=myDir --routing --lazy --parentModule=apps/my-dir/${myapp}/src/app/app.module.ts`
      );

      runCLI(`build my-dir-${myapp} --aot`);
      expectTestsPass(await runCLIAsync(`test my-dir-${myapp} --no-watch`));
    }
  }, 1000000);

  it('should support router config generation (eager)', async () => {
    // TODO: npm build is failing for Angular because of webpack 4
    // remove this condition once `node` is migrated to webpack 5
    if (getSelectedPackageManager() !== 'npm') {
      const myapp = uniq('myapp');
      runCLI(`generate @nrwl/angular:app ${myapp} --directory=myDir --routing`);
      const mylib = uniq('mylib');
      runCLI(
        `generate @nrwl/angular:lib ${mylib} --directory=myDir --routing --parentModule=apps/my-dir/${myapp}/src/app/app.module.ts`
      );

      runCLI(`build my-dir-${myapp} --aot`);
      expectTestsPass(await runCLIAsync(`test my-dir-${myapp} --no-watch`));
    }
  }, 1000000);

  it('should support Ivy', async () => {
    // TODO: npm build is failing for Angular because of webpack 4
    // remove this condition once `node` is migrated to webpack 5
    if (getSelectedPackageManager() !== 'npm') {
      const myapp = uniq('myapp');
      runCLI(
        `generate @nrwl/angular:app ${myapp} --directory=myDir --routing --enable-ivy`
      );

      runCLI(`build my-dir-${myapp} --aot`);
      expectTestsPass(await runCLIAsync(`test my-dir-${myapp} --no-watch`));
    }
  }, 1000000);

  it('should support building in parallel', () => {
    // TODO: npm build is failing for Angular because of webpack 4
    // remove this condition once `node` is migrated to webpack 5
    if (getSelectedPackageManager() !== 'npm') {
      if (getSelectedPackageManager() === 'pnpm') {
        // TODO: This tests fails with pnpm but we should still enable this for other package managers
        return;
      }
      const myapp = uniq('myapp');
      const myapp2 = uniq('myapp');
      runCLI(`generate @nrwl/angular:app ${myapp}`);
      runCLI(`generate @nrwl/angular:app ${myapp2}`);

      runCLI('run-many --target build --all --parallel');
    }
  });

  it('should support eslint and pass linting on the standard generated code', async () => {
    const myapp = uniq('myapp');
    runCLI(`generate @nrwl/angular:app ${myapp} --linter=eslint`);
    expect(runCLI(`lint ${myapp}`)).toContain('All files pass linting.');

    const mylib = uniq('mylib');
    runCLI(`generate @nrwl/angular:lib ${mylib} --linter=eslint`);
    expect(runCLI(`lint ${mylib}`)).toContain('All files pass linting.');
  });

  it('should support eslint and successfully lint external HTML files and inline templates', async () => {
    const myapp = uniq('myapp');

    runCLI(`generate @nrwl/angular:app ${myapp} --linter=eslint`);

    const templateWhichFailsBananaInBoxLintCheck = `<div ([foo])="bar"></div>`;
    const wrappedAsInlineTemplate = `
        import { Component } from '@angular/core';

        @Component({
          selector: 'inline-template-component',
          template: \`
            ${templateWhichFailsBananaInBoxLintCheck}
          \`,
        })
        export class InlineTemplateComponent {}
      `;

    // External HTML template file
    updateFile(
      `apps/${myapp}/src/app/app.component.html`,
      templateWhichFailsBananaInBoxLintCheck
    );

    // Inline template within component.ts file
    updateFile(
      `apps/${myapp}/src/app/inline-template.component.ts`,
      wrappedAsInlineTemplate
    );

    const appLintStdOut = runCLI(`lint ${myapp}`, { silenceError: true });
    expect(appLintStdOut).toContain(
      path.normalize(`apps/${myapp}/src/app/app.component.html`)
    );
    expect(appLintStdOut).toContain(`1:6`);
    expect(appLintStdOut).toContain(`Invalid binding syntax`);
    expect(appLintStdOut).toContain(
      path.normalize(`apps/${myapp}/src/app/inline-template.component.ts`)
    );
    expect(appLintStdOut).toContain(
      `The selector should start with one of these prefixes`
    );
    expect(appLintStdOut).toContain(`7:18`);
  });
});
