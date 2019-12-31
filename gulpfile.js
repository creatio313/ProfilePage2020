const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require("gulp-clean-css");
const pug = require( 'gulp-pug' );


// pugƒRƒ“ƒpƒCƒ‹
function pugcom(cb){
	gulp
		.src('pug/*.pug')
		.pipe(pug())
		.pipe( gulp.dest( './' ) );
	cb();
}
function sasscom(cb){
	gulp
		.src('./sass/*.sass')
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./css/'));
	cb();
}
function watch(cb){
    gulp.watch('./sass/*.sass', gulp.task('sasscom'));
    gulp.watch('./pug/*.pug', gulp.task('pugcom'));
}

function defaultTask(cb) {
  // place code for your default task here
  console.log("aaa");
  cb();
}
exports.pugcom = pugcom
exports.sasscom = sasscom
exports.watch = watch
exports.default = watch