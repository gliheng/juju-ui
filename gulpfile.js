const { dest, src } = require("gulp");
const sass = require("sass");
const rename = require('gulp-rename');
const { Transform } = require('stream');


const src = [
  './src/**/*.scss',
];
const loadPaths = [
  'src/assets/styles',
];
const sourceMap = false;
const destDir = './dist/styles';

const sassTransform = new Transform({
  objectMode: true,
  async transform(obj, encoding, callback) {
    let ret = await sass.compileStringAsync(
      obj.contents.toString(encoding),
      {
        loadPaths,
        sourceMap,
      },
    );
    obj.contents = Buffer.from(ret.css, encoding);
    if (ret.sourceMap) {
      // sourceMap output is not supported
    }
    this.push(obj);
    callback();
  }
});

const buildCss = function() {
  return src(src)
  .pipe(sassTransform)
  .pipe(rename({dirname: ''}))
  .pipe(dest(destDir));
}

exports.buildCss = buildCss;
