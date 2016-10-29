var gulp = require('gulp');
var watch = require('gulp-watch');
var path = require('path');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');

var distPath = './dist/css';
var stlyePath = './lib/css';

// Compile less
gulp.task('less', function() {
    return gulp.src(['./lib/css/style.less'])
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(distPath));
});

//watch
gulp.task('watch', ['less'], function() {
    return gulp.src([stlyePath + '/style.less'], { base: './lib/css'})
        .pipe(watch([stlyePath + '/style.less'], { base: './lib/css'}))
        .pipe(less())
        .pipe(gulp.dest(distPath));
});

gulp.task('production', ['less'], function() {
    return gulp.src(destPath + '/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest(distPath));
});