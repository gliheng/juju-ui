<template>
  <p>Do you like apple?</p>
  <p>
    <j-checkbox v-model="checked">{{ checked ? 'Yes' : 'No' }}</j-checkbox>
  </p>
</template>

<script setup>
import { ref } from 'vue';

let checked = ref(false);
</script>
