<template>
  <div class="dev">
    <component :is="Component" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import NotFound from './NotFound.vue';

const route = useRoute();
const { component, part } = route.params;
const Component = defineAsyncComponent({
  loader() {
    return import(`./${component}/parts/${part}.vue`)
  },
  errorComponent: NotFound,
});
</script>

<style scoped>
.dev {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
