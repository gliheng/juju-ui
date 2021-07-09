<template>
  <div>
    <h1>ContextMenu</h1>
    <code-block :code="contextMenuPartCode">
      <context-menu-part />
    </code-block>
  </div>
</template>

<script>
import ContextMenuPart from './parts/ContextMenuPart.vue';
import contextMenuPartCode from './parts/ContextMenuPart.vue?raw';

export default {
  setup() {
    return {
      contextMenuPartCode,
    };
  },
  components: {
    ContextMenuPart,
  },
}
</script>
