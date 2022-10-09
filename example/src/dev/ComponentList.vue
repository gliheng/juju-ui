<template>
  <h1>Component List</h1>
  <ul>
    <li v-for="d of entries">
      <router-link :to="{name: 'dev', params: {component: d}}">{{d}}</router-link>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import qs from 'qs';

const entries = ref([]);
onMounted(async () => {
  const res = await fetch('/@file-listing?' + qs.stringify({ type: 'd', path: 'src/views'}));
  entries.value = await res.json();
})
</script>

<style scoped>
</style>
