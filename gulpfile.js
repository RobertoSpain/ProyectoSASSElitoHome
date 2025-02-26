const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Usar Dart Sass

// Removed the problematic gulp-userref dependency
// We'll add it back once basic functionality is working

function processCSS() {
  return src('scss/main.scss')
    .pipe(sass())
    .pipe(rename({ suffix: '.min', extname: '.css' }))
    .pipe(dest('dist/assets/css'));
}

function processHTML() {
  return src('*.html') // Fixed the glob pattern (was '*html')
    .pipe(dest('dist'));
}

function procesarImagenes() {
  return src('img/*')
    .pipe(dest('dist/img'));
}

function procesarJS() {
  return src('js/*.js')
    .pipe(dest('dist/assets/js'));
}

exports.processCSS = processCSS;
exports.processHTML = processHTML;
exports.procesarImagenes = procesarImagenes;
exports.procesarJS = procesarJS;

gulp.task('sass', function () {
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'watch'));