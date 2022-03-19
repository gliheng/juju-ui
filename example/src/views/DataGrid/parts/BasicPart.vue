<template>
  <j-data-grid
    :data="data"
    :config="config"
  />
</template>

<script setup>
import { reactive } from 'vue';
import { generateData } from './utils';

const data = reactive(generateData(100, 100));
const config = reactive(
  {
    sizes: {
      1: 60,
      'A': 60,
    },
    align: {
      'A': 'center',
      'C3': 'center',
    },
    merges: {
      'D4': {
        hspan: 2,
        vspan: 4,
      },
      'E9': {
        hspan: 2,
        vspan: 4,
      },
    },
    sticky: new Set([0, 1, 'A']),
  },
);
</script>

<style>
</style>
