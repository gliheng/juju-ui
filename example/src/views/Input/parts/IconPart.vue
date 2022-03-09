<template>
  <j-input placeholder="Username" v-model="v">
    <template #prepend>
      <j-svg-icon name="alarm" />
    </template>
    <template #append>
      <j-svg-icon name="arrow-forward" />
    </template>
  </j-input>
</template>

<script setup>
import { ref } from 'vue';

let v = ref('');
</script>
