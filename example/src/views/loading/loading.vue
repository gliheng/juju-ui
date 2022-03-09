<template>
  <div>
    <h1>loading directive</h1>
    <code-block :code="loadingPartCode">
      <loading-part />
    </code-block>
  </div>
</template>

<script setup>
import LoadingPart from './parts/LoadingPart.vue';
import loadingPartCode from './parts/LoadingPart.vue?raw';
</script>
