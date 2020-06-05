/**
 * ADAPTED FROM: https://github.com/lassjs/is-valid-npm-name
 */

import * as slug from 'speakingurl';

const errors = {
  notString: 'package name must be a String',
  trim: 'remove trailing spaces from start and end of package name',
  maxLength: 'package name cannot be more than 214 characters',
  dotUnderscore: 'package name cannot start with a dot nor underscore',
  uppercase: 'package name cannot have uppercase letters',
  atFirst: 'scoped package name must start with "@" character',
  extraAt: `scoped package name has an extra "@" character`,
  noSlash: 'scoped package name must be in the format of @myorg/package',
  extraSlash: `scoped package name has an extra "/" character`,
  builtIn: 'package name cannot use built-in core Node module name',
  nonURLSafe: 'package name had non-URL-safe characters',
};

function isValidNpmPackageName(str: string) {
  // ensure it's a string
  if (!(typeof str === 'string' && str !== '')) return errors.notString;

  // first trim it
  if (str !== str.trim()) return errors.trim;

  // can't be > 214 characters
  if (str.length > 214) return errors.maxLength;

  // can't start with a dot or underscore
  if (['.', '_'].includes(str.slice(0, 1))) return errors.dotUnderscore;

  // no uppercase letters
  if (str !== str.toLowerCase()) return errors.uppercase;

  //
  // name can be prefixed by a scope, e.g. @myorg/package
  //

  // must have @
  if (str.includes('@')) {
    // must have @ at beginning of string
    if (str.indexOf('@') !== 0) return errors.atFirst;

    // must have only one @
    if (str.indexOf('@') !== str.lastIndexOf('@')) return errors.extraAt;

    // must have /
    if (!str.includes('/')) return errors.noSlash;

    // must have only one /
    if (str.indexOf('/') !== str.lastIndexOf('/')) return errors.extraSlash;

    // validate scope
    const arr = str.split('/');
    const scope = arr[0].slice(1);
    const isValidScopeName = isValidNpmPackageName(scope);

    if (isValidScopeName !== true) return isValidScopeName;

    // validate name again
    return isValidNpmPackageName(arr[1]);
  }

  // // don't use the same name as a core Node module
  // // <https://stackoverflow.com/a/35825896/3586413>
  // if (_builtinLibs.includes(str)) return errors.builtIn;

  // no non-URL-safe characters
  // <https://github.com/lovell/limax/issues/24>
  const safeStr = slug(str);
  if (str !== safeStr)
    return `${errors.nonURLSafe}, try using "${safeStr}" instead`;

  return true;
}

/**
 * Throws an error if the validation fails
 * @param name name of the package
 */
export function validateNpmPackageName(str: string) {
  const result = isValidNpmPackageName(str);

  if (result !== true) {
    throw new Error(result);
  } else {
    return true;
  }
}
