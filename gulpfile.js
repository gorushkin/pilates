"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require('del');
var server = require("browser-sync").create();
var plumber = require("gulp-plumber");


function refresh (done) {
  server.reload();
  done()
};

function clean () {
  return del("build")
};

function copy () {
  return gulp.src([
    'source/*.html',
    'source/js/**',
    'source/img/**',
    'source/fonts/**',
    "source/pp/**"
   ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
};

function css () {
  return gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
};

function watch () {
  server.init({
      server: {
          baseDir: "build/"
      }
  });

  gulp.watch('source/fonts/*.*', gulp.series(copy, refresh));
  gulp.watch('source/img/*.*', gulp.series(copy, refresh));
  gulp.watch('source/js/*.*', gulp.series(copy, refresh));
  gulp.watch('source/*.html', gulp.series(copy, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', css);
};

gulp.task('build',
  gulp.series(clean,
    gulp.parallel(css, copy)
  )
);

gulp.task('watch', watch);
gulp.task("start", gulp.series('build', watch));
