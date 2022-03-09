<template>
  <div>
    <h1>ContextMenu</h1>
    <code-block :code="contextMenuPartCode">
      <context-menu-part />
    </code-block>
  </div>
</template>

<script setup>
import ContextMenuPart from './parts/ContextMenuPart.vue';
import contextMenuPartCode from './parts/ContextMenuPart.vue?raw';
</script>
