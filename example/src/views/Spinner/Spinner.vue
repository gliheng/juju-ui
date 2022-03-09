<template>
  <div>
    <h1>Spinner</h1>
    <section>
      <h2>Size</h2>
      <code-block :code="spinnerPartCode">
        <spinner-part />
      </code-block>
    </section>
    <section>
      <h2>Button</h2>
      <code-block :code="spinnerButtonPartCode">
        <spinner-button-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import SpinnerPart from './parts/SpinnerPart.vue';
import spinnerPartCode from './parts/SpinnerPart.vue?raw';
import SpinnerButtonPart from './parts/SpinnerButtonPart.vue';
import spinnerButtonPartCode from './parts/SpinnerButtonPart.vue?raw';
</script>

<style scoped>
:deep(.j-button) {
  margin: 0.2rem;
}
</style>