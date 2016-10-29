/*eslint-disable*/
'use strict';
const babelOptions = {
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ]
};
process.env.wallabyScriptDir = __dirname;
module.exports = function(wallaby) {
  return {
    env: {
      type: 'node'
    },

    testFramework: 'jest',

    files: [
      'src/**/*.js',
      'test/**/*.js',
      '!test/**/*.test.js'
    ],

    tests: [
      '!test/**/*.js',
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
