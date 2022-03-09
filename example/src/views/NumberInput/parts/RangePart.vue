<template>
  <j-number-input v-model="num" :min="50" :max="100" :step="10" />
  <p>Value: {{ num }}</p>
</template>

<script setup>
import { ref } from 'vue';

let num = ref(50);
</script>