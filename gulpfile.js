var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    nano    = require('gulp-cssnano'),
    rename  = require('gulp-rename'),
    less    = require('gulp-less');

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

gulp.task('minify-less', function() {
    return gulp.src(paths.less)
    .pipe(less())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.build));
});

gulp.task('minify-sass', function() {
    return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.build));
});

gulp.task('test', ['less', 'sass']);
gulp.task('minify', ['minify-less', 'minify-sass']);

gulp.task('default', ['test', 'minify']);
