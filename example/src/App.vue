<template>
  <router-view v-slot="{ Component }">
    <j-scaffold class="app" v-if="!headless" :actions="[{
      icon: 'logo-github', sticky: true,
      link: 'https://github.com/gliheng/juju-ui', target: '_blank',
    }]">
      <template #title>
        <router-link to="/">
          <h1>🍄 juju-ui</h1>
        </router-link>
      </template>
      <template #content>
        <component class="demo" :is="Component" />
        <footer>Copyright © 2020 juju</footer>
      </template>
      <template #drawer>
      </template>
    </j-scaffold>
    <component v-else :is="Component" />
  </router-view>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    let route = useRoute();
    let headless = computed(() => route.meta.fullPage || false);
    return {
      headless,
    };
  }
}
</script>

<style lang="scss">
.j-scaffold.app {
  display: flex;
  .j-appbar-title, .j-scaffold-title {
    h1 {
      font-size: 1.6em;
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
  }
  footer {
    text-align: center;
    margin: 2rem 0;
  }
}
</style>