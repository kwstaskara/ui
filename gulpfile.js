var gulp = require('gulp');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');


var input = 'scss/pyramid.scss';

var output = 'dist';
gulp.task('sass', function () {

gulp //add gulp without return to keep session going

// Find all .scss files from the sass/ folder

.src(input)

// Run Sass on those files || pipe adds everything together

.pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error

.pipe( autoprefixer( 'last 20 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )

// Write the resulting CSS in the output folder

.pipe(gulp.dest(output));

});
gulp.task("default", ['sass'], function() {

gulp.watch(input, ['sass']);

});

