var path = require('path');

var BASE_DIR = path.resolve(__dirname, './src');

module.exports = {
  entry: BASE_DIR + '/main.es6',
  output: {
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test : /\.es6?/,
        include : BASE_DIR,
        loader : 'babel'
      }
    ]
  },
  devtool: "inline-source-map"
};