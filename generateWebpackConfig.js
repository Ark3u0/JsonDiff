var path = require('path');

var generateWebpackConfig = function(env) {
    var that = {};

    var TEST_DIR = path.resolve(__dirname, "./test");
    var SRC_DIR = path.resolve(__dirname, "./src");

    that.module = {
      loaders: [
        {
          test: /\.es6?/,
          include: (env === 'TEST' ? TEST_DIR : SRC_DIR),
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    };

    that.devtool = "inline-source-map";

    if (env !== 'TEST') {
      that.entry = SRC_DIR + '/main.es6';
      that.output = {
        filename: 'main.js'
      };
    }

    return that;
};

module.exports = generateWebpackConfig;