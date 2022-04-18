<template>
  <div>
    <h1>Descriptions</h1>
    <section>
      <h2>Descriptions</h2>
      <code-block :code="descriptionsPartCode">
        <descriptions-part />
      </code-block>
    </section>
    <section>
      <h2>Vertical descriptions</h2>
      <code-block :code="verticalPartCode">
        <vertical-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import DescriptionsPart from "./parts/DescriptionsPart.vue";
import descriptionsPartCode from "./parts/DescriptionsPart.vue?raw";
import VerticalPart from "./parts/VerticalPart.vue";
import verticalPartCode from "./parts/VerticalPart.vue?raw";
</script>