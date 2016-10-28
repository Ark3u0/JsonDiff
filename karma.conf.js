var generateWebpackConfig = require('./generateWebpackConfig.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      "./test/**/*.jsx",
      "./test/*.jsx"
    ],
    reporters: ['progress'],
    preprocessors: {
      './test/*.jsx': ['webpack', 'sourcemap'],
      './test/**/*.jsx': ['webpack', 'sourcemap']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false,
    webpack: generateWebpackConfig('TEST'),
    webpackMiddleware: {
      noInfo: true
    }
  })
};
