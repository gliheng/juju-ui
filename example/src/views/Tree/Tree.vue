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

<script>
import TreePart from './parts/TreePart.vue';
import treePartCode from './parts/TreePart.vue?raw';

export default {
  setup() {
    return { treePartCode };
  },
  components: { TreePart },
}
</script>