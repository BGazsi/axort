var gulp = require('gulp');
var watch = require('gulp-watch');
var path = require('path');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');

var distPath = './dist/css';
var stlyePath = './lib/css';

gulp.task('fonts', function() {
    return gulp.src(['./node_modules/bootstrap/fonts/*'])
        .pipe(gulp.dest('./dist/fonts'));
});

// Compile less
gulp.task('less', ['fonts'], function() {
    return gulp.src(['./lib/css/style.less'])
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task('scripts', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/js/transition.js',
        './node_modules/bootstrap/js/dropdown.js',
        './node_modules/bootstrap/js/carousel.js',
        './node_modules/bootstrap/js/collapse.js',
        './lib/js/script.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js/'));
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