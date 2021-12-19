const { dest, src } = require("gulp");
const sass = require("sass");
const through = require("through2");
const rename = require('gulp-rename');

const { Transform } = require('stream');

const sassTransform = new Transform({
  objectMode: true,
  async transform(obj, encoding, callback) {
    let ret = await sass.compileStringAsync(
      obj.contents.toString(encoding),
      {
        loadPaths: ['src/assets/styles'],
      },
    );
    obj.contents = Buffer.from(ret.css, encoding);
    this.push(obj);
    callback();
  }
});

const buildCss = function() {
  return src([
    './src/**/*.scss',
    './src/assets/styles/index.scss',
  ])
  .pipe(sassTransform)
  .pipe(rename({dirname: ''}))
  .pipe(dest("./dist/styles"));
}

exports.buildCss = buildCss;
