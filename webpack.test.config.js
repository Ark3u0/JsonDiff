var path = require('path');

var TEST_DIR = path.resolve(__dirname, './test');

module.exports = {
  module: {
    loaders: [
      { test : /\.es6?/,
        include : TEST_DIR,
        loader : 'babel'
      }
    ]
  },
  devtool: "inline-source-map"
};