<template>
  <p>
    <j-input placeholder="Username" v-model="v" />
  </p>
  <p>
    <j-input placeholder="Username" v-model="v" disabled />
  </p>
  <p>Current value: {{ v }}</p>
</template>

<script setup>
import { ref } from 'vue';

let v = ref('');
</script>
