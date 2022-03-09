<template>
  <j-select v-model="v" placeholder="Select a transport" :options="transportOptions" />
</template>

<script setup>
import { ref } from 'vue';
import { transportOptions } from './options';

let v = ref();
</script>
