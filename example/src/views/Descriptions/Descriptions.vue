<template>
  <div>
    <h1>Descriptions</h1>
    <section>
      <h2>Descriptions</h2>
      <code-block :code="descriptionsPartCode">
        <descriptions-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import DescriptionsPart from "./parts/DescriptionsPart.vue";
import descriptionsPartCode from "./parts/DescriptionsPart.vue?raw";
</script>