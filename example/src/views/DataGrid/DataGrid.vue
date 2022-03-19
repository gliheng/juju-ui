<template>
  <div>
    <h1>DataGrid</h1>
    <code-block :code="basicPartCode">
      <basic-part />
    </code-block>
  </div>
</template>

<script setup>
import BasicPart from './parts/BasicPart.vue';
import basicPartCode from './parts/BasicPart.vue?raw';
</script>
