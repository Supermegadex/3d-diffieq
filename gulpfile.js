const gulp = require('gulp');
const config = require('./webpack.config');
const webpack = require('webpack-stream');

gulp.task('copy', function(){
  return gulp.src('static/**/*.*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack', function(){
  return gulp.src('src/index.ts')
    .pipe(webpack(config))
    .pipe(gulp.dest('dist/'))
});

exports.default = gulp.parallel('copy', 'webpack');

