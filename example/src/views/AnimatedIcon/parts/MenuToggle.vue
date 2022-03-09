<template>
  <j-animated-icon:menu-toggle v-model="on" />
</template>

<script setup>
import { ref } from 'vue';

let on = ref(false);
</script>