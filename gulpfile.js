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
    reload = browserSync.reload;

var paths = {
  appjs: ['./public/js/app.js'],
  css: ['./public/css/*.less'],
  dist: './public/dist/',
  html: ['./public/*.html']
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

gulp.task('serve', ['watch'], function () {
  nodemon({script: 'server.js'}) //start server
})

gulp.task('watch', function() {
  //watch files
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.appjs, ['js']);
});

gulp.task('default', ['js', 'css', 'browser-sync']);
