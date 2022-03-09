<template>
  <j-space>
    <j-number-input v-model="num" />
    <j-number-input v-model="num" type="horizontal" />
  </j-space>
  <div>
    <p>Value: {{ num }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let num = ref(0);
</script>