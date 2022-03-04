const {src, dest, watch, series, parallel} =  require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


function server() { 
  browserSync.init({ 
    server: { 
      baseDir: "./"
    }
  });
}

function buildStyles() {
  return src('scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest('css'))
    .pipe(browserSync.stream());
};



function watcher() {
  watch(['scss/**/*.scss'], series(buildStyles));
  watch(['js/**/*.js']).on('change', browserSync.reload);
  watch('./*.html').on('change', browserSync.reload);
  

}



module.exports.buildStyles = buildStyles;
module.exports.default = parallel(server, buildStyles, watcher)