<template>
  <div>
    <h1>AutoComplete</h1>
    <section>
      <code-block :code="autoCompletePartCode">
        <auto-complete-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import AutoCompletePart from './parts/AutoCompletePart.vue';
import autoCompletePartCode from './parts/AutoCompletePart.vue?raw';
</script>