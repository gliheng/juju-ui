<template>
  <div>
    <h1>Tree</h1>
    <section>
      <code-block :code="treePartCode">
        <tree-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import TreePart from './parts/TreePart.vue';
import treePartCode from './parts/TreePart.vue?raw';
</script>