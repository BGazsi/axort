var gulp = require('gulp');
var watch = require('gulp-watch');
var path = require('path');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');

// var bootstrapPath = [
//     './node_modules/bootstrap/less/**/*.less'
// ];
// var libPath = './lib/css/**/*.less';
var destPath = './dest/css';
var stlyePath = './lib/css';

//bootstrap lessek kezelese
// { base: './node_modules' }
gulp.task('move', function() {
    gulp.src('./node_modules/bootstrap/less/**/*.less')
    .pipe(gulp.dest('./lib/css/bootstrap'));
});

// Compile less
gulp.task('less', ['move'], function() {
    return gulp.src(['./lib/css/style.less'])
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(destPath));
});

//watch
gulp.task('watch', ['less'], function() {
    return gulp.src([stlyePath + '/style.less'], { base: './lib/css'})
        .pipe(watch([stlyePath + '/style.less'], { base: './lib/css'}))
        .pipe(less())
        .pipe(gulp.dest(destPath));
});

gulp.task('production', ['less'], function() {
    return gulp.src(destPath + '/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest(destPath));
});