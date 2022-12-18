<template>
  <router-view v-slot="{ Component }">
    <j-scaffold
      v-if="!headless"
      class="app"
      :actions="actions"
    >
      <template #title>
        <router-link to="/">
          <h1>🍄 juju-ui</h1>
        </router-link>
      </template>
      <template #right-actions>
        <j-auto-complete
          placeholder="Search"
          clearable
          :query="query"
          @select="onSearch"
        >
          <template #prepend>
            <j-icon name="search" />
          </template>
        </j-auto-complete>
      </template>
      <template #content>
        <component :is="Component" />
        <footer>Copyright © 2020-2022 juju</footer>
      </template>
    </j-scaffold>
    <component v-else :is="Component" />
  </router-view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from './config';

let route = useRoute();
let router = useRouter();
let headless = computed(() => route.meta.fullPage || false);
let dark = ref(false);

watch(dark, v => {
  document.documentElement.classList.toggle('j-dark');
});

const actions = [{
  icon: 'logo-github', sticky: true,
  link: 'https://github.com/gliheng/juju-ui', target: '_blank',
}];

function query(v) {
  let ret = [];
  for (let key in config) {
    let group = config[key];
    for (let d of group) {
      if (d.name.toLowerCase().indexOf(v) != -1) {
        ret.push({ label: d.name, value: d.name });
      }
    }
  }
  return ret;
}

function onSearch(v, opt) {
  if (opt) {
    router.push({ name: opt.value });
  }
}
</script>

<style lang="scss">
.j-scaffold.app {
  display: flex;
  .j-appbar {
    .j-appbar-right-actions {
      color: var(--j-text-color);
    }
  }
  .j-appbar-title, .j-scaffold-title {
    h1 {
      font-size: 1.6em;
      margin: 0;
    }
  }
  .j-scaffold-content {
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
    > .demo {
      flex: 1;
    }
    > footer {
      text-align: center;
      margin: 2rem 0;
    }
  }

}
</style>
