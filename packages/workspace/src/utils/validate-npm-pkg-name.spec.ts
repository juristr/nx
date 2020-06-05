import { validateNpmPackageName } from './validate-npm-pkg-name';

/**
 * Rules: https://docs.npmjs.com/files/package.json#name
 */

describe('Validate npm package name', () => {
  ['a'.repeat(214), '@myorg/awesomeness', 'awesomelib'].forEach((pkgName) => {
    it(`should succeed for ${pkgName}`, () => {
      expect(validateNpmPackageName(pkgName)).toBeTruthy();
    });
  });

  [
    {
      name: 'a'.repeat(215),
      error: /more than 214 characters/,
    },
    { name: '_myawesomepkg', error: /cannot start with a dot nor underscore/ },
    { name: '.myawesomepkg', error: /cannot start with a dot nor underscore/ },
    { name: 'Mypackage', error: /uppercase letters/ },
    { name: '@my/super/org', error: /scoped package name has an extra/ },
    {
      name: '@my/SuperPkg',
      error: /package name cannot have uppercase letters/,
    },
  ].forEach((pkgTest) => {
    it(`should fail for ${pkgTest.name}`, () => {
      function execValidation() {
        validateNpmPackageName(pkgTest.name);
      }

      if (pkgTest.error) {
        expect(execValidation).toThrowError(pkgTest.error);
      } else {
        expect(execValidation).toThrowError();
      }
    });
  });
});
