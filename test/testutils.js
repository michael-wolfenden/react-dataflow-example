const appRootPath = require('app-root-path');
const proxyquireLib = require('proxyquire');
const _ = require('lodash');

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

export function parameterized(name, params, test) {
  _.forEach(params,
    (param, index) => {
      it(`${index}:${name}  ${(param.description || '')}`, asyncSpec(() => {
        test(index, param);
      }));
    }
  );
}

export function spy(...methodNames) {
  const o = {};
  _.forEach(methodNames, (name) => {
    o[name] = jasmine.createSpy(name);
  });
  return o;
}

export function expectNoMethodsToHaveBeenCalled(o) {
  _.forEach(o, (v) => {
    if (_.isFunction(v) && jasmine.isSpy(v)) {
      expect(v).not.toHaveBeenCalled();
    }
  });
}
