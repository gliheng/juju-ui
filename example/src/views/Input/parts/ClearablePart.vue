<template>
  <j-input placeholder="Username" clearable v-model="v">
    <template #prepend>
      <j-icon name="search" />
    </template>
  </j-input>
</template>

<script setup>
import { ref } from 'vue';

let v = ref('');
</script>