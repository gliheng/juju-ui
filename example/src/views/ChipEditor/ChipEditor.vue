<template>
  <div>
    <h1>ChipEditor</h1>
    <code-block :code="chipEditorPartCode">
      <chip-editor-part />
    </code-block>
  </div>
</template>

<script setup>
import ChipEditorPart from './parts/ChipEditorPart.vue';
import chipEditorPartCode from './parts/ChipEditorPart.vue?raw';
</script>

