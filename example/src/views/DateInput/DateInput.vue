<template>
  <div>
    <h1>DateInput</h1>
    <section>
      <h2>Single date</h2>
      <code-block :code="singleDatePartCode">
        <single-date-part />
      </code-block>
    </section>
    <section>
      <h2>Double date</h2>
      <code-block :code="doubleDatePartCode">
        <double-date-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import SingleDatePart from "./parts/SingleDatePart.vue";
import singleDatePartCode from "./parts/SingleDatePart.vue?raw";
import DoubleDatePart from "./parts/DoubleDatePart.vue";
import doubleDatePartCode from "./parts/DoubleDatePart.vue?raw";
</script>