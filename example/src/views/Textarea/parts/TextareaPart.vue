<template>
  <j-textarea v-model="v" cols="40" rows="10" />
  <p>Current value: {{ v }}</p>
  <j-textarea v-model="v" cols="40" rows="10" disabled />
</template>

<script setup>
import { ref } from 'vue'

let v = ref('');
</script>
