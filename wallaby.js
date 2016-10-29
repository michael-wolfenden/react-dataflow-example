/*eslint-disable*/
'use strict';
const babelOptions = JSON.parse(require('fs').readFileSync(`${__dirname}/.babelrc`));
module.exports = function(wallaby) {
  return {
    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    files: [
      'src/**/*.js',
      'test/**/*.js',
      '!test/**/*.test.js'
    ],

    tests: [
      'test/**/*.test.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel(babelOptions)
    },

    setup: function(w) {
      require('babel-polyfill');
      require('app-root-path').setPath(w.projectCacheDir);
    }
  };
};
