<template>
  <div>
    <h1>ChipEditor</h1>
    <code-block :code="chipEditorPartCode">
      <chip-editor-part />
    </code-block>
  </div>
</template>

<script>
import ChipEditorPart from './parts/ChipEditorPart.vue';
import chipEditorPartCode from './parts/ChipEditorPart.vue?raw';

export default {
  setup() {
    return { chipEditorPartCode };
  },
  components: {
    ChipEditorPart,
  },
};
</script>

