var path = require('path');

var generateWebpackConfig = function(env) {
    var that = {};

    var TEST_DIR = path.join(__dirname, "test");
    var SRC_DIR = path.join(__dirname, "src");
    var NODE_MODULES = path.join(__dirname, 'node_modules');

    that.module = {
      loaders: [
        {
          test: /\.jsx?/,
          include: (env === 'TEST' ? [TEST_DIR, SRC_DIR] : SRC_DIR),
          exclude: NODE_MODULES,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    };

    that.devtool = "inline-source-map";

    if (env !== 'TEST') {
      that.entry = SRC_DIR + '/main.jsx';
      that.output = {
        filename: 'main.js'
      };
    }

    return that;
};

module.exports = generateWebpackConfig;