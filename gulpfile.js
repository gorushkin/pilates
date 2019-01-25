"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require('del');
var server = require("browser-sync").create();

function refresh (done) {
  server.reload();
  done()
};

function clean () {
  return del("build")
};

function html () {
  return gulp.src('source/*.html', {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
};

function css () {
  return gulp.src('source/sass/style.scss')
  .pipe(sass())
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
};

function watch () {
  server.init({
      server: {
          baseDir: "build/"
      },
      tunnel: true
  });

  gulp.watch('source/*.html', gulp.series(html, refresh));
  gulp.watch('source/sass/*.scss', css);
};

gulp.task('build',
  gulp.series(clean,
    gulp.parallel(css, html)
  )
);

gulp.task('watch', watch);
gulp.task("start", gulp.series('build', watch));
