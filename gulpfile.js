var gulp = require('gulp');
var babel = require('gulp-babel');

var webpack = require("webpack-stream");

var TestServer = require('karma').Server;

gulp.task('bundle', function(done) {
  return webpack(require('./webpack.config.js'))
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
