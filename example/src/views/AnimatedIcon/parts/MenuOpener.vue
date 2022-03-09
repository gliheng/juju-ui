<template>
  <j-animated-icon:menu-opener v-model="on" />
</template>

<script setup>
import { ref } from 'vue';

let on = ref(false);
</script>