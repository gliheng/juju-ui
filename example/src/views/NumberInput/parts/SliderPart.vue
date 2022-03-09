<template>
  <j-space>
    <j-number-input v-model="num" :min="0" :max="100" type="slider" />
  </j-space>
  <div>
    <p>Value: {{ num }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let num = ref(0);
</script>