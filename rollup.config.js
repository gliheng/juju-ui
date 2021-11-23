import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy';
// import url from '@rollup/plugin-url';

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
    copy({
      targets: {
        src: './src/package.json',
        dest: './dist/'
      }
    }),
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