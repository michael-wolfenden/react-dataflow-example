const appRootPath = require('app-root-path');
const proxyquireLib = require('proxyquire');

export function requireAbsolute(path, noPreserveCache = false) {
  if (noPreserveCache) {
    return proxyquire(path, {});
  } else {
    return appRootPath.require(path);
  }
}

export function proxyquire(path, imports) {
  try {
    return proxyquireLib.noCallThru().noPreserveCache()(appRootPath.resolve(path), imports);
  } catch (e) {
    throw new Error(`while requiring file ${path}: ${e.stack}`);
  }
}

export function asyncSpec(fn) {
  return async(done) => {
    try {
      await fn();
      done();
    } catch (err) {
      done.fail(err);
    }
  };
}
