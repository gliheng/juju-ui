<template>
  <j-data-grid :data="data" ref="grid" v-slot="{i, j, datum}">
    <div>{{ datum }}</div>
  </j-data-grid>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { generateData } from './utils';

const data = reactive(generateData(100, 100));

const grid = ref();
</script>

<style>
</style>
