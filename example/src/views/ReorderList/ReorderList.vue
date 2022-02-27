<template>
  <div>
    <h1>ReorderList</h1>
    <section>
      <h2>ReorderList</h2>
      <code-block :code="reorderListPartCode">
        <reorder-list-part />
      </code-block>
    </section>

    <section>
      <h2>Customize list with slot</h2>
      <code-block :code="slotPartCode">
        <slot-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import ReorderListPart from './parts/ReorderListPart.vue';
import reorderListPartCode from './parts/ReorderListPart.vue?raw';
import SlotPart from './parts/SlotPart.vue';
import slotPartCode from './parts/SlotPart.vue?raw';
</script>
