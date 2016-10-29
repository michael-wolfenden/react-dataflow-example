const proxyquireLib = require('proxyquire');

export function proxyquire(path, imports) {
  try {
    return proxyquireLib.noCallThru().noPreserveCache()(path, imports);
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
