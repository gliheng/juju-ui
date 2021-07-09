import { createApp } from 'vue';
import ui from 'juju-ui';
import 'juju-ui/style.css';
import './index.css';
import App from './App.vue';
import router from './router';
import CodeBlock from './components/CodeBlock.vue';

createApp(App)
  .component('code-block', CodeBlock)
  .use(router)
  .use(ui({
    popupBaseDepth: 2000,
  })).mount('#app')
