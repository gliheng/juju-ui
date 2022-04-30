import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue';
import Dev from './views/Dev.vue';
import NotFound from './views/NotFound.vue';
import config, { allComponents } from './config';
import { kebabCase } from 'lodash-es';
export { config };

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  ...allComponents.map(mapRoute),
];

// add dev route
if (import.meta.env.DEV) {
  routes.push({
    path: '/dev/:component/:part',
    name: 'dev',
    component: Dev,
    meta: {
      fullPage: true,
    },
  });
}

// add 404 catch-all route
routes.push({
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: NotFound,
});

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

function mapRoute(c) {
  let kName = kebabCase(c.name);
  return {
    path: `/${kName}`,
    name: c.name,
    meta: { fullPage: c.fullPage || false },
    component: () => import(`./views/${c.name}/${c.name}.vue`),
  };
}