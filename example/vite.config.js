import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  build: {
    minify: false,
  },
  optimizeDeps: {
    exclude: [
      'juju-ui',
    ]
  }
});