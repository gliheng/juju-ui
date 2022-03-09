<template>
  <j-select multiple v-model="v" placeholder="Select preferred tranport" :options="transportOptions" />
</template>

<script setup>
import { ref } from 'vue';
import { transportOptions } from './options';

let v = ref([]);
</script>