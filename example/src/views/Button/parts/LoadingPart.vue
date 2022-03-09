<template>
  <j-button class="j-primary" :loading="loading" icon="at-outline" @click="doSave">Save</j-button>
</template>

<script setup>
import { ref } from 'vue';

let loading = ref(false);
function doSave() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 6000);
}
</script>
