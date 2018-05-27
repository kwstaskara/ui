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

//js-friendly vars 

var output2 = 'dist/js-framework-friendly';
var input6 = 'dist/js-framework-friendly/pyramid-js-friendly.css';
var input7 = 'dist/js-framework-friendly/pyramid-js-friendly-prefixed.css';
var input8 = 'dist/js-framework-friendly/pyramid-js-friendly-nofallbacks.css';
var input9 = 'dist/js-framework-friendly/pyramid-js-friendly-prefixed-nofallbacks.css'
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





  gulp.task('check', function () {

    if (fs.existsSync(input2)) {
        gulp.start('minify-css');
        gulp.start('autoprefixer');
        gulp.start('autoprefixer2');
        gulp.start('autoprefixer3');
        gulp.start('sass-norem');
        gulp.start('minify-css2');
        gulp.start('minify-css3');
        //js-framework-friendly now
        gulp.start('js-friendly');
        gulp.start('js-friendly-minify');
        gulp.start('autoprefixer-js-friendly');
        gulp.start('js-friendly-prefixed-minify');
        gulp.start('js-friendly-nofallbacks');
        gulp.start('js-friendly-nofallbacks-minify');
        gulp.start('autoprefixer-js-friendly-nofallbacks');
        gulp.start('js-friendly-prefixed-nofallbacks-minify');
        
      } else {
        console.log('FILE DOES NOT EXIST');
      }
});



gulp.task('js-friendly', function () {
        return gulp.src(input)
        .pipe(header('$no-states-mode-on: ' + true + '!default' ))
        .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
        .pipe(rename("pyramid-js-friendly.css"))
        .pipe(gulp.dest(output2));
        });
        gulp.task('js-friendly-minify', ['js-friendly'], () => {
            return gulp.src(input6)
              .pipe(csso())
              .pipe(rename("pyramid-js-friendly.min.css"))
              .pipe(gulp.dest(output2));
          });
          gulp.task('autoprefixer-js-friendly',['js-friendly','js-friendly-minify'], function () {
            return gulp.src(input6)
                .pipe(postcss([ autoprefixer(['> 1%', 'last 10 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']) ]))
                .pipe(rename("pyramid-js-friendly-prefixed.css"))
                .pipe(gulp.dest(output2));
        });

        gulp.task('js-friendly-prefixed-minify', ['autoprefixer-js-friendly'], () => {
            return gulp.src(input7)
              .pipe(csso())
              .pipe(rename("pyramid-js-friendly-prefixed.min.css"))
              .pipe(gulp.dest(output2));
          });
          gulp.task('js-friendly-nofallbacks', ['js-friendly-prefixed-minify'], function () {
            return gulp.src(input6)
            .pipe(header('$no-states-mode-on: ' + true + '!default' ))
            .pipe(header('$rem-fallback: ' + false + '!default' ))
            .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
            .pipe(rename("pyramid-js-friendly-nofallbacks.css"))
            .pipe(gulp.dest(output2));
            });


            gulp.task('js-friendly-nofallbacks-minify', ['js-friendly-nofallbacks'], () => {
                return gulp.src(input8)
                  .pipe(csso())
                  .pipe(rename("pyramid-js-friendly-nofallbacks.min.css"))
                  .pipe(gulp.dest(output2));
              });


              gulp.task('autoprefixer-js-friendly-nofallbacks',['js-friendly-nofallbacks','js-friendly-prefixed-minify'], function () {
                return gulp.src(input8)
                    .pipe(postcss([ autoprefixer(['> 1%', 'last 10 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']) ]))
                    .pipe(rename("pyramid-js-friendly-prefixed-nofallbacks.css"))
                    .pipe(gulp.dest(output2));
            });
            gulp.task('js-friendly-prefixed-nofallbacks-minify', ['autoprefixer-js-friendly-nofallbacks'], () => {
                return gulp.src(input8)
                  .pipe(csso())
                  .pipe(rename("pyramid-js-friendly-prefixed-nofallbacks.min.css"))
                  .pipe(gulp.dest(output2));
              });