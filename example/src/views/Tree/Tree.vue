<template>
  <div>
    <h1>Tree</h1>
    <section>
      <h2>Simple tree</h2>
      <code-block :code="treePartCode">
        <tree-part />
      </code-block>
    </section>
    <section>
      <h2>ItemRenderer prop</h2>
      <code-block :code="itemRendererPartCode">
        <item-renderer-part />
      </code-block>
    </section>
    <section>
      <h2>Default slot</h2>
      <code-block :code="slotPartCode">
        <slot-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import TreePart from './parts/TreePart.vue';
import treePartCode from './parts/TreePart.vue?raw';
import ItemRendererPart from './parts/ItemRendererPart.vue';
import itemRendererPartCode from './parts/ItemRendererPart.vue?raw';
import SlotPart from './parts/SlotPart.vue';
import slotPartCode from './parts/SlotPart.vue?raw';
</script>