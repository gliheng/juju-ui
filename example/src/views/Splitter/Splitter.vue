<template>
  <div>
    <h1>Splitter</h1>
    <section>
      <h2>Horizontal Splitter</h2>
      <code-block :code="horizontalPartCode">
        <horizontal-part />
      </code-block>
    </section>
    <section>
      <h2>Vertical Splitter</h2>
      <code-block :code="verticalPartCode">
        <vertical-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import HorizontalPart from './parts/HorizontalPart.vue';
import horizontalPartCode from './parts/HorizontalPart.vue?raw';
import VerticalPart from './parts/VerticalPart.vue';
import verticalPartCode from './parts/VerticalPart.vue?raw';
</script>
