"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require('del');
var server = require("browser-sync").create();


gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
  .pipe(sass())
  .pipe(gulp.dest("build/css"))
});

gulp.task('html', function() {
  return gulp.src('source/*.html', {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
});

gulp.task('clean', function() {
  return del("build")
});

gulp.task('build', gulp.series (
  'clean',
  'css',
  'html'
));

gulp.task('qwe', function(){
  console.log('seen');
});

gulp.task('watch', function(){
  gulp.watch('source/*.html', gulp.series('build'));
  gulp.watch('source/sass/*.scss', gulp.series('build'));

});
