import { createApp } from 'vue';
import ui from 'juju-ui';
import 'juju-ui/style.css';
import './index.css';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(ui({
  popupBaseDepth: 2000,
})).mount('#app')
