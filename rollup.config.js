import glob from 'glob';
import vue from 'rollup-plugin-vue';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss';
import image from '@rollup/plugin-image';

let entries = [].concat(
  'src/index.ts',
  glob.sync('src/components/**/!(_*).vue'),
);

export default {
  input: entries,
  output: {
    format: 'esm',
    dir: 'dist',
    entryFileNames: '[name].esm.js',
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
      prefix: '@import "./src/assets/style.scss";',
      output: 'dist/style.css',
      sass: require('sass'),
    }),
    vue({
      css: false,
    }),
  ]
};