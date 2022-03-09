<template>
  <j-calendar v-model="date" />
</template>

<script setup>
import { ref } from 'vue';

let date = ref();
</script>
