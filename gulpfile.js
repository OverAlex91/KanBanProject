'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('serve', function () {

	browserSync.init({
		server: "./app"
	});
	gulp.watch("app/*.html").on('change', browserSync.reload);
	gulp.watch("app/css/**/*.css").on('change', browserSync.reload);
});