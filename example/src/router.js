import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue';
import config from './config';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  ...config.Components.map(mapRoute),
  ...config.Directives.map(mapRoute),
];

const routeMap = {};
routes.forEach(r => {
  routeMap[r.name] = r;
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { routeMap };
export default router;

function kebabCase(s) {
  let parts = [];
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (i != 0 && s[i].toUpperCase() == s[i]) {
      parts.push(s.substring(start, i));
      start = i;
    }
  }
  parts.push(s.substring(start));
  return parts.map(s => s.toLowerCase()).join('-');
}

function mapRoute(c) {
  let kName = kebabCase(c.name);
  return {
    path: `/${kName}`,
    name: c.name,
    meta: { fullPage: c.fullPage || false },
    component: () => import(`./views/${c.name}.vue`),
  };
}