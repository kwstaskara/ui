var gulp = require('gulp');

var sass = require('gulp-sass');

var rename = require('gulp-rename');

var csso = require('gulp-csso');

var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');

var header = require('gulp-header');

var wait = require('gulp-wait2');

var input = 'scss/pyramid.scss';

var input2 = 'dist/pyramid.css';

var input3 = 'dist/pyramid.min.css';

var input4 = 'dist/pyramid-nofallbacks.css';

var input5 ='dist/pyramid-prefixed-nofallbacks.css';

var output = 'dist';

var fs = require('fs');


gulp.task('sass', function () {
    return gulp.src(input)
    .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
    .pipe(gulp.dest(output));
    
  
    });
    gulp.task("default", ['sass'], function() {
    
    gulp.start('check');

   
    });
    
    gulp.task('sass-norem', function () {
        return gulp.src(input)
        .pipe(header('$rem-fallback: ' + false + '!default' ))
        .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
        .pipe(rename("pyramid-nofallbacks.css"))
        .pipe(gulp.dest(output));
        
      
        });


    gulp.task('check', function () {

        if (fs.existsSync(input2)) {
            gulp.start('minify-css');
            gulp.start('autoprefixer');
            gulp.start('autoprefixer2');
            gulp.start('autoprefixer3');
            gulp.start('sass-norem');
            gulp.start('minify-css2');
            gulp.start('minify-css3');
          } else {
            console.log('FILE DOES NOT EXIST');
          }
    });

   


gulp.task('autoprefixer', function () {
    return gulp.src(input2)
        .pipe(rename("pyramid-prefixed.css"))
        .pipe(postcss([ autoprefixer(['> 1%', 'last 10 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']) ]))
        .pipe(gulp.dest(output));
});


gulp.task('autoprefixer2',['autoprefixer'], function () {
    return gulp.src(input3)
        .pipe(postcss([ autoprefixer(['> 1%', 'last 10 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']) ]))
        .pipe(rename("pyramid-prefixed.min.css"))
        .pipe(gulp.dest(output));
});


gulp.task('autoprefixer3',['autoprefixer2'], function () {
    return gulp.src(input4)
        .pipe(postcss([ autoprefixer(['> 1%', 'last 10 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']) ]))
        .pipe(rename("pyramid-prefixed-nofallbacks.css"))
        .pipe(gulp.dest(output));
});

gulp.task('minify-css', () => {
    return gulp.src(input2)
      .pipe(csso())
      .pipe(rename("pyramid.min.css"))
      .pipe(gulp.dest(output));
  });


  gulp.task('minify-css2', ['minify-css'], () => {
    return gulp.src(input4)
      .pipe(csso())
      .pipe(rename("pyramid-nofallbacks.min.css"))
      .pipe(gulp.dest(output));
  });


  gulp.task('minify-css3', ['autoprefixer3'], () => {
    return gulp.src(input5)
      .pipe(csso())
      .pipe(rename("pyramid-prefixed-nofallbacks.min.css"))
      .pipe(gulp.dest(output));
  });