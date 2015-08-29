'use strict';

var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	jshint = require('gulp-jshint'),
	istanbul = require('gulp-istanbul'),
	gutil = require('gulp-util');

gulp.task('default', function() {

});

gulp.task('hint-test', function() {
	return gulp.src('test/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

gulp.task('hint-source', function() {
	return gulp.src(['public/**/*.js', 'data/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('mocha', function() {
	return gulp.src('test/*.js', {read:false})
		.pipe(mocha({reporter:'list'}))
		.on('error', gutil.log);
});

gulp.task('istanbul', function(cb) {
	return gulp.src(['public/**/*.js','data/**/*.js'])
		.pipe(istanbul({includeUntested: true}))
		.on('finish', function() {
			gulp.src(['test/*.js'])
				.pipe(mocha())
				.pipe(istanbul.writeReports())
				.pipe(istanbul.enforceThresholds({thresholds: {global:40} }))
				.on('end', cb);
		});
});

gulp.task('watch-mocha', function(){
	gulp.run('mocha');
	gulp.watch(['./**/*.js','test/**/*.js'],['mocha']);
});
