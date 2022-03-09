<template>
  <j-date-input placeholder="Select start date" v-model="date" />
</template>

<script setup>
import { ref } from 'vue';

let date = ref();
</script>
