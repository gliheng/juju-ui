const { dest, src } = require("gulp");
const { sass } = require("@mr-hope/gulp-sass");
const rename = require('gulp-rename');

const buildCss = function() {
  return src([
    './src/**/*.scss',
    './src/assets/styles/index.scss',
  ]).pipe(sass({
    includePaths: ['./src/assets/styles']
  }).on("error", sass.logError))
  .pipe(rename({dirname: ''}))
  .pipe(dest("./dist/styles"));
}

exports.buildCss = buildCss;
