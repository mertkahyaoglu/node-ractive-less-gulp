// npm install --global gulp to use from terminal
// npm install gulp for a project

var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    jasmine = require('gulp-jasmine'),
    reload = browserSync.reload;

var paths = {
  appjs: ['./public/js/app.js'],
  css: ['./public/css/*.less'],
  dist: './public/dist/',
  html: ['./public/*.html'],
  tests: ['spec/**.js']
};

gulp.task('js', function () {
  return browserify(paths.appjs).bundle()
    .pipe(source('bundle.js')) // converts to stream
    .pipe(streamify(uglify())) // streaming uglify
    .pipe(gulp.dest(paths.dist)) // output
    .pipe(reload({stream:true})); // reload on change
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(less()) // compile to css
    .pipe(minifyCSS()) // minify
    .pipe(gulp.dest(paths.dist)) // output
    .pipe(reload({stream:true})); // reload on change
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(reload({stream:true})); // reload on change
});

gulp.task('browser-sync', ['serve'], function() {
  // sync changes with browser
	browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

//start server
gulp.task('serve', ['watch'], function () {
  nodemon({script: 'server.js'});
})

//watch files
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.appjs, ['js']);
});

//tests
gulp.task('test', function () {
    return gulp.src(paths.tests)
        .pipe(jasmine());
});

gulp.task('build', ['js', 'css']);
gulp.task('default', ['build', 'browser-sync']);
