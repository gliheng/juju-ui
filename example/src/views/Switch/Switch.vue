<template>
  <div>
    <h1>Switch</h1>
    <code-block :code="switchPartCode">
      <switch-part />
    </code-block>
  </div>
</template>

<script setup>
import SwitchPart from './parts/SwitchPart.vue';
import switchPartCode from './parts/SwitchPart.vue?raw';
</script>
