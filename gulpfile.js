const { src, dest, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const minifyCSS = require('gulp-csso');

function html() {
  return src('pug/*.pug')
    .pipe(pug())
    .pipe(dest('./'))
}

function css() {
  return src('sass/*.sass')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('css'))
}

exports.css = css;
exports.html = html;

exports.all = parallel(html, css);

exports.default = function() {
  watch('sass/*.sass', css);
  watch('pug/*.pug', html);
};