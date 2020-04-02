'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');




gulp.task('scss', function(){
	return gulp.src('sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(plumber())
	.pipe(postcss([
		autoprefixer({
			 browsers: ['last 2 versions'],
            cascade: false
		})
		]))
	.pipe (sourcemaps.write())
	.pipe(gulp.dest('css'))
	.pipe(minify())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function(){
	return gulp.src('index.html')
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function(){
	browserSync.init ({
		server: {
			baseDir:"./"
		}
	});
});


gulp.task('copy', function () {
	return gulp.src([
	'./fonts/**/*.{woff, woff2}',
	'./img/**',
	'./js/**'
		], {
			base: './'
		})
	.pipe(gulp.dest('build'));
})




gulp.task('watch', function(){
	gulp.watch('index.html', gulp.parallel('html'))
	gulp.watch('sass/**/*.scss', gulp.parallel('scss'))
});

gulp.task('default', gulp.parallel('browser-sync', 'watch', 'copy') )