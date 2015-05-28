var gulp = require('gulp');
var server = require('gulp-express');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');

gulp.task('fonts', function(){
	gulp.src(['bower_components/uikit/fonts/*'])
		.pipe(gulp.dest('public/fonts/'));
});

gulp.task('images', function(){
	gulp.src(['frontend/images/**/*'])
		.pipe(gulp.dest('public/images/'));
});

gulp.task('js', function(){
	gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/uikit/js/uikit.js', 'frontend/js/**/*.js'])
		.pipe(concat('base.js').on('error', gutil.log))
		.pipe(gulp.dest('public/js/'));
});

gulp.task('less', function(){
	return gulp.src(['frontend/less/base.less'])
		.pipe(less({compress: true}).on('error', gutil.log))
		.pipe(minifyCSS({keepBreaks:false}))
		.pipe(gulp.dest('public/css/'));
});

gulp.task('default', ['fonts', 'images', 'js', 'less'], function(){
	server.run(['app.js']);
	
	//watch for copy/rebuilds
	gulp.watch(['bower_components/uikit/fonts/*'], ['fonts']);
	gulp.watch(['frontend/images/**/*'], ['images']);
	gulp.watch(['bower_components/uikit/js/uikit.js', 'bower_components/jquery/dist/jquery.js', 'frontend/js/**/*.js'], ['js']);
	gulp.watch(['bower_components/uikit/less/uikit.less', 'frontend/less/**/*.less'], ['less']);
	
	gulp.watch(['public/fonts/**/*'], server.notify);
	gulp.watch(['public/images/**/*'], server.notify);
	gulp.watch(['public/js/**/*.js'], server.notify);
	gulp.watch(['public/css/**/*.css'], server.notify);
	gulp.watch(['pages/**/*.html'], server.notify);
	//MUST ADD TO WATCH ANY DIR OR JS FILES FROM NODEJS
	gulp.watch(['app.js'], [server.run]);
	
});