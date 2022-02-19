<template>
  <div>
    <h1>Form</h1>
    <section>
      <h1>Basic Form</h1>
      <basic-form-part />
    </section>

    <section>
      <h2>Inline Form</h2>
      <inline-form-part />
    </section>

    <section>
      <h2>Label Postion</h2>
      <top-position-form-part />
    </section>
  </div>
</template>

<script setup>
import BasicFormPart from './parts/BasicFormPart.vue';
import InlineFormPart from './parts/InlineFormPart.vue';
import TopPositionFormPart from './parts/TopPositionFormPart.vue';
</script>
