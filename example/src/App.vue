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
      <template #right-actions>
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
import { useRoute } from 'vue-router';

let route = useRoute();
let headless = computed(() => route.meta.fullPage || false);
let dark = ref(false);

watch(dark, v => {
  document.documentElement.classList.toggle('j-dark');
});
</script>

<style lang="scss">
.j-scaffold.app {
  display: flex;
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
