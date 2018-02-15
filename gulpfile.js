var gulp = require('gulp');

var sass = require('gulp-sass');

var rename = require('gulp-rename');

var cssnano = require('cssnano');

var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');

var wait = require('gulp-wait2');

var input = 'scss/pyramid.scss';

var input2 = 'dist/pyramid.css';

var output = 'dist';

var fs = require('fs');


gulp.task('sass', function () {
    return gulp.src(input)
    .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
    .pipe(gulp.dest(output));
    
  
    });
    gulp.task("default", ['sass'], function() {
    
    gulp.watch(input, ['sass']);

    gulp.start('check');

   
    });
    

    gulp.task('check', function () {

        if (fs.existsSync(input2)) {
            gulp.start('autoprefixer');
            gulp.start('cssnano');
          } else {
            console.log('FILE DOES NOT EXIST');
          }
    });

   


gulp.task('autoprefixer', function () {
    return gulp.src(input2)
        .pipe(postcss([ autoprefixer(['> 1%', 'last 10 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']) ]))
        .pipe(gulp.dest(output));
});


gulp.task('cssnano', function () {
    var plugins = [
        cssnano()
    ];
    return gulp.src(input2)
        .pipe(postcss(plugins))
        .pipe(rename("pyramid.min.css"))
        .pipe(gulp.dest(output));
});
