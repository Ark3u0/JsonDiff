var gulp = require('gulp');
var babel = require('gulp-babel');
var generateWebpackConfig = require('./generateWebpackConfig.js');

var webpack = require("webpack-stream");

var TestServer = require('karma').Server;

gulp.task('bundle', function(done) {
  return webpack(generateWebpackConfig('DEV'))
    .pipe(gulp.dest('.'));
});

gulp.task('test', function(done) {
  new TestServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(exitCode) {
    done();
    process.exit(exitCode)
  }).start();
});

gulp.task('default', ['bundle']);
