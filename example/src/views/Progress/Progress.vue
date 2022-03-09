<template>
  <div>
    <h1>ProgressBar</h1>
    <section>
      <code-block :code="progressPartCode">
        <progress-part />
      </code-block>
    </section>
    <section>
      <h2>Striped</h2>
      <code-block :code="stripedPartCode">
        <striped-part />
      </code-block>
    </section>
    <section>
      <h2>Indeterminate</h2>
      <code-block :code="indeterminatePartCode">
        <indeterminate-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import ProgressPart from './parts/ProgressPart.vue';
import progressPartCode from './parts/ProgressPart.vue?raw';
import StripedPart from './parts/StripedPart.vue';
import stripedPartCode from './parts/StripedPart.vue?raw';
import IndeterminatePart from './parts/IndeterminatePart.vue';
import indeterminatePartCode from './parts/IndeterminatePart.vue?raw';
</script>

<style scoped>
section :deep(.j-progress) {
  margin: 10px 0;
}
</style>
