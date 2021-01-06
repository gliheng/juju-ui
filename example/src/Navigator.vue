<template>
  <div>
    <div class="device-list">
      <j-toggle-button-group v-model="device">
        <j-toggle-button icon="list" size="sm">All</j-toggle-button>
        <j-toggle-button size="sm">
          <j-svg-icon :svg="pcIcon" view-box="0 0 100 100" />&nbsp;PC
        </j-toggle-button>
        <j-toggle-button size="sm">
          <j-svg-icon :svg="mobileIcon" view-box="0 0 93.169 93.169" />&nbsp;Mobile
        </j-toggle-button>
      </j-toggle-button-group>
    </div>
    <section v-for="(group, groupName) in config" :key="groupName">
      <h3>{{ groupName }}</h3>
      <div class="grid">
        <router-link v-for="(c, idx) in group" :key="idx" :active="route.name == c.name" :to="routeMap[c.name].path">
          <div class="box">{{ c.name }}</div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import config from './config.json';
import { routeMap } from './router';
import { ref, computed } from 'vue';

const DEVICE_MAP = ['all', 'pc', 'mobile'];

let device = ref(0);
let filteredConfig = computed(() => {
  let d = DEVICE_MAP[device.value];
  if (d == 'all') return config;
  let config2 = {};
  for (let key in config) {
    config2[key] = config[key].filter(c => c.device.indexOf(d) != -1);
  }
  return config2;
});

export default {
  setup() {
    let route = useRoute();
    const pcIcon = `<path d="M95.834,5.13H3.5c-1.93,0-3.5,1.57-3.5,3.5v59c0,0.001,0.002,0.003,0.002,0.005v9.005c0,1.141,0.924,2.063,2.063,2.063
		h36.564c-0.184,4.056-1.082,12.198-5.293,13.983c0,0-1.635,1.517,2.939,1.517h7.83h10.792h7.83c4.571,0,2.938-1.517,2.938-1.517
		c-4.211-1.785-5.108-9.928-5.293-13.983h36.938c1.141,0,2.014-0.923,2.014-2.063v-8.912c0.002-0.033,0.01-0.063,0.01-0.098v-59
		C99.334,6.702,97.764,5.13,95.834,5.13z M47.25,71.63c0-1.334,1.082-2.417,2.418-2.417c1.334,0,2.416,1.082,2.416,2.417
		s-1.082,2.417-2.416,2.417C48.332,74.047,47.25,72.965,47.25,71.63z M96.334,65.293H3V8.63c0-0.276,0.225-0.5,0.5-0.5h92.334
		c0.275,0,0.5,0.224,0.5,0.5V65.293z"/>`;
    const mobileIcon = `<path d="M64.902,0H28.265c-3.711,0-6.72,3.009-6.72,6.72v79.729c0,3.712,3.008,6.72,6.72,6.72h36.637
		c3.713,0,6.722-3.008,6.722-6.72V6.72C71.623,3.009,68.615,0,64.902,0z M42.088,3.973h8.991c0.323,0,0.586,0.263,0.586,0.587
		c0,0.323-0.263,0.586-0.586,0.586h-8.991c-0.324,0-0.586-0.263-0.586-0.586C41.502,4.236,41.765,3.973,42.088,3.973z M33.126,2.563
		c0.518,0,0.938,0.42,0.938,0.938c0,0.518-0.419,0.938-0.938,0.938s-0.938-0.42-0.938-0.938C32.188,2.983,32.608,2.563,33.126,2.563
		z M28.876,2.001c0.829,0,1.5,0.672,1.5,1.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5C27.376,2.673,28.047,2.001,28.876,2.001z
		 M48.93,89.758h-4.691c-1.488,0-2.693-1.205-2.693-2.691c0-1.487,1.205-2.692,2.693-2.692h4.691c1.488,0,2.693,1.205,2.693,2.692
		C51.623,88.553,50.418,89.758,48.93,89.758z M68.777,82.248H24.391V10.92h44.386V82.248z"/>`;
    return {
      route, routeMap, config: filteredConfig,
      device, pcIcon, mobileIcon,
    };
  },
}
</script>

<style lang="scss" scoped>
.device-list {
  text-align: center;
}
section {
  h3 {
    color: #999;
    margin-bottom: 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-gap: 1rem;
    margin: 1rem 0;
    .box {
      padding: 1rem;
      text-align: center;
      background-color: #eee;
      &:hover {
        background-color: var(--primary-color-lighter);
      }
    }
  }
}
</style>