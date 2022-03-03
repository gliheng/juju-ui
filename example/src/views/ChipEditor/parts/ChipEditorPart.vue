<template>
  <j-chip-editor placeholder="Chip editor here" v-model="data" />
  <p>{{ data }}</p>
</template>

<script setup>
import { ref } from 'vue';
let data = ref(['A', 'B']);
</script>