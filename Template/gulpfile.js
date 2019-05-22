const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require("del");


function clean(){
  return del(['public/static/*.js', 'public/static/*.css']);
}

function css(cb) {
  return gulp.src(["src/*.css"])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/static/'));
}

function css_libs(cb) {
  console.log('css');
  return gulp.src(["node_modules/bootstrap/dist/css/bootstrap.css"])
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('public/static/'));
  cb();
}

function js(cb) {
  return gulp.src(["src/*.js"])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/static/'));
}

function js_libs(cb) {
  return gulp.src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/bootstrap/dist/js/bootstrap.bundle.js",
    "node_modules/lodash/lodash.js"  ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('public/static/'));
}

function watch() {
  return gulp.watch(['src/*'], build);
}

const build_only = gulp.series(css, js, css_libs, js_libs);
const build = gulp.series(clean, build_only);

exports.default = gulp.series(build, watch);
exports.build = build;
exports.watch = watch;
exports.clean = clean;
