<template>
  <div>
    <h1>Checkbox</h1>
    <section>
      <h2>Checkbox group</h2>
      <code-block :code="groupPartCode">
        <group-part />
      </code-block>
    </section>
    <section>
      <h2>Boolean checkbox</h2>
      <code-block :code="booleanPartCode">
        <boolean-part />
      </code-block>
    </section>
    <section>
      <h2>Tri state checkbox</h2>
      <code-block :code="triStatePartCode">
        <tri-state-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import GroupPart from './parts/GroupPart.vue';
import groupPartCode from './parts/GroupPart.vue?raw';
import BooleanPart from './parts/BooleanPart.vue';
import booleanPartCode from './parts/BooleanPart.vue?raw';
import TriStatePart from './parts/TriStatePart.vue';
import triStatePartCode from './parts/TriStatePart.vue?raw';

export default {
  setup() {
    return {
      groupPartCode,
      booleanPartCode,
      triStatePartCode,
    };
  },
  components: {
    GroupPart,
    BooleanPart,
    TriStatePart,
  },
}
</script>

<style scoped>
:deep(.j-checkbox) {
  margin-right: 10px;
}
</style>