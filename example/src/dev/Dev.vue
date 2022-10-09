<template>
  <div class="dev">
    <component :is="Component" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import NotFound from '../views/NotFound.vue';
import ComponentList from './ComponentList.vue';
import PartList from './PartList.vue';

const route = useRoute();
const Component = computed(() => {
  const { component, part } = route.params;
  if (!component) {
    return ComponentList;
  } else if (!part) {
    return PartList;
  } else {
    return defineAsyncComponent({
      loader() {
        return import(`../views/${component}/parts/${part}.vue`)
      },
      errorComponent: NotFound,
    });
  }
});
</script>

<style scoped>
.dev {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
