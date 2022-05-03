<template>
  <h1>PopSelect</h1>
  <div>
    <section>
      <h2>Simple PopSelect</h2>
      <code-block :code="popSelectPartCode">
        <pop-select-part />
      </code-block>
    </section>
    <section>
      <h2>PopSelect with input</h2>
      <code-block :code="inputPartCode">
        <input-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import PopSelectPart from './parts/PopSelectPart.vue';
import popSelectPartCode from './parts/PopSelectPart.vue?raw';
import InputPart from './parts/InputPart.vue';
import inputPartCode from './parts/InputPart.vue?raw';
</script>