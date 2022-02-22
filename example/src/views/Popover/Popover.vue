<template>
  <h1>Popover</h1>
  <div>
    <section>
      <code-block :code="popoverPartCode">
        <popover-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import PopoverPart from './parts/PopoverPart.vue';
import popoverPartCode from './parts/PopoverPart.vue?raw';
</script>