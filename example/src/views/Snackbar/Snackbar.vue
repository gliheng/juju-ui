<template>
  <div>
    <h1>Snackbar</h1>
    <code-block :code="snackbarPartCode">
      <snackbar-part />
    </code-block>
  </div>
</template>

<script setup>
import SnackbarPart from './parts/SnackbarPart.vue';
import snackbarPartCode from './parts/SnackbarPart.vue?raw';
</script>
