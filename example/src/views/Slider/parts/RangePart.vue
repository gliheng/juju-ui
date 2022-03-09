<template>
  <j-slider :min="100" :max="1000" :step="100" v-model="v" />
  <p>Value: {{ v }}</p>
</template>

<script setup>
import { ref } from 'vue';

let v = ref(100);
</script>