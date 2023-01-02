import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import fileListing from './file-listing';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), fileListing()],
  optimizeDeps: {
    exclude: [
      'juju-ui',
    ]
  }
});
