var gulp = require('gulp'),
    sass = require('gulp-sass'),
    less = require('gulp-less');

var paths = {
    less: 'less/simple-line-icons.less',
    sass: 'scss/simple-line-icons.scss',
    build: 'build/'
};

gulp.task('less', function(){
    return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.build));
});

gulp.task('sass', function(){
    return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.build));
});

gulp.task('test', ['less', 'sass']);

gulp.task('default', ['test']);
