'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('lint', function () {
  return gulp.src(['index.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});


gulp.task('test', function() {
  return gulp.src(['./test/*.js'], {read: false})
    .pipe(plugins.mocha());
});

gulp.task('default', ['lint', 'test']);
