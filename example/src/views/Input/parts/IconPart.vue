<template>
  <j-input placeholder="Username" v-model="v">
    <template #prepend>
      <j-icon name="alarm" />
    </template>
    <template #append>
      <j-icon name="arrow-forward" />
    </template>
  </j-input>
</template>

<script setup>
import { ref } from 'vue';

let v = ref('');
</script>
