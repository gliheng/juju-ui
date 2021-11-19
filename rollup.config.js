import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
// import url from '@rollup/plugin-url';
// import copy from '@rollup/plugin-copy';

export default {
  input: {
    index: 'src/index.ts',
    utils: "src/utils/index.ts",
  },
  output: {
    format: 'esm',
    dir: 'dist',
    entryFileNames: '[name].js',
    sourcemap: true,
  },
  external: ['vue'],
  plugins: [
    typescript({
      check: false,
    }),
    alias({
      entries: {
        "@assets": "src/assets"
      }
    }),
    image(),
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