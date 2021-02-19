import path from 'path';
import glob from 'glob';
import vue from 'rollup-plugin-vue';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss';
import image from '@rollup/plugin-image';

let getFileName = (p) => {
  let ext = path.extname(p);
  return path.basename(p, ext);
}

const components = glob.sync('src/components/**/!(_*).@(vue|tsx)');

let entries = {
  index: 'src/index.ts',
  utils: 'src/utils/index.ts',
  ...Object.fromEntries(components.map(filePath => {
    return [ getFileName(filePath), filePath ];
  })),
};

export default {
  input: entries,
  output: {
    format: 'esm',
    dir: 'dist',
    entryFileNames: '[name].js',
    sourcemap: true,
  },
  external: ['vue'],
  plugins: [
    copy({
      targets: [
        { src: 'package.json', dest: 'dist/' },
      ],
    }),
    image(),
    typescript(),
    scss({
      output: 'dist/style.css',
      sass: require('sass'),
    }),
    vue({
      target: 'browser',
      css: false,
    }),
  ],
};