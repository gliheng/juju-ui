<template>
  <h1>Part List</h1>
  <ul>
    <li v-for="d of entries">
      <router-link :to="{name: 'dev', params: {component: component, part: d}}">{{d}}</router-link>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import qs from 'qs';

const route = useRoute();
const { component } = route.params;
const entries = ref([]);
onMounted(async () => {
  const res = await fetch('/@file-listing?' + qs.stringify({ type: 'f', path: `src/views/${component}/parts`}));
  const files = await res.json();
  entries.value = files.map(e => {
    let i = e.lastIndexOf('.');
    return i != -1 ? e.slice(0, i) : e;
  });
})
</script>

<style lang="scss" scoped>
</style>
