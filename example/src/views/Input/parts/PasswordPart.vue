<template>
  <p>
    <j-input
      type="password"
      placeholder="Password"
      v-model="v1"
      show-password="click" />
  </p>
  <p>
    <j-input
      type="password"
      placeholder="Password"
      v-model="v2"
      show-password="mousedown" />
  </p>
</template>

<script setup>
import { ref } from 'vue';

let v1 = ref('');
let v2 = ref('');
</script>
