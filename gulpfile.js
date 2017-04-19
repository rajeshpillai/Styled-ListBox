"use strict";
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    ignore = require('gulp-ignore'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    minifyCSS = require('gulp-clean-css'),
    del = require('del'),
    runSequence = require('run-sequence');

gulp.task('minifycss', function () {
  gulp.src('bi-era.com_listbox/*.css')
    .pipe(minifyCSS({ keepBreaks: false }))
    .pipe(gulp.dest('bi-era.com_listbox/dist'));
});

gulp.task('minifyjs', function () {
  gulp.src(['bi-era.com_listbox/bi-era.com_listbox.js'])
    .pipe(ignore.exclude(["**/*.map"]))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('bi-era.com_listbox/dist'));
});

gulp.task('copy', function () {
  gulp.src(['bi-era.com_listbox/bi-era.com_listbox.qext','bi-era.com_listbox/bi-era.com_listbox.png', 'bi-era.com_listbox/wbfolder.wbl'])
    .pipe(gulp.dest('bi-era.com_listbox/dist'));
});

gulp.task('cleanup', function (){
  return del('bi-era.com_listbox/dist/**', {force: true});
});

gulp.task('prod', function () {
  runSequence(
    'cleanup',
    ['minifycss', 'minifyjs','copy']);
});

