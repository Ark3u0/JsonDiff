var webpackConfig = require('./webpack.test.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ["test/*Test.es6"],
    reporters: ['progress'],
    preprocessors: {
      './test/*Test.js': ['webpack', 'sourcemap']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
};
