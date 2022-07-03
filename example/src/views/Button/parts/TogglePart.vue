<template>
  <j-toggle-button on-icon="heart" off-icon="heart-dislike" v-model="toggleOn">
    <template #on>Like</template>
    <template #off>Dislike</template>
  </j-toggle-button>
</template>

<script setup>
import { ref } from 'vue';

let toggleOn = ref(false);
</script>
