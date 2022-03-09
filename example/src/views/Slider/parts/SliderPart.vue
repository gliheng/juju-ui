<template>
  <j-slider v-model="v" />
  <p>Value: {{ v }}</p>
</template>

<script setup>
import { ref } from 'vue';

let v = ref(0);
</script>