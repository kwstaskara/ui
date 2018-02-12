var gulp = require('gulp');

var sass = require('gulp-sass');

var cssnano = require('gulp-cssnano');

var rename = require('gulp-rename');

var autoprefixer = require('gulp-autoprefixer');


var input = 'scss/pyramid.scss';

var input2 = 'dist/pyramid.css';

var output = 'dist';

gulp.task('cssnano', function() {
    return gulp.src(input2)
    .pipe(cssnano())
    .pipe(rename("pyramid.min.css"))
    .pipe(gulp.dest(output));
    
});

gulp.task('sass', function () {
gulp 
.src(input)
.pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
.pipe( autoprefixer( 'last 20 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )

.pipe(gulp.dest(output));
gulp.start('cssnano');
});
gulp.task("default", ['sass'], function() {

gulp.watch(input, ['sass']);

});

