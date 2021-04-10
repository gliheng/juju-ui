import vue from 'rollup-plugin-vue';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss';
import image from '@rollup/plugin-image';


export default {
  input: {
    index: 'src/index.ts',
  },
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