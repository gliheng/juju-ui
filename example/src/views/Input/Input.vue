<template>
  <div>
    <h1>Input</h1>
    <section>
      <code-block :code="inputPartCode">
        <input-part />
      </code-block>
    </section>
    <section>
      <h2>Prepend and append icons</h2>
      <code-block :code="iconPartCode">
        <icon-part />
      </code-block>
    </section>
    <section>
      <h2>Clearable input</h2>
      <code-block :code="clearablePartCode">
        <clearable-part />
      </code-block>
    </section>
    <section>
      <h2>InputGroup</h2>
      <code-block :code="groupPartCode">
        <group-part />
      </code-block>
    </section>
    <section>
      <h2>Group addons</h2>
      <code-block :code="groupAddonPartCode">
        <group-addon-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import InputPart from './parts/InputPart.vue';
import IconPart from './parts/IconPart.vue';
import ClearablePart from './parts/ClearablePart.vue';
import GroupPart from './parts/GroupPart.vue'
import GroupAddonPart from './parts/GroupAddonPart.vue'

import inputPartCode from './parts/InputPart.vue?raw';
import iconPartCode from './parts/IconPart.vue?raw';
import clearablePartCode from './parts/ClearablePart.vue?raw';
import groupPartCode from './parts/GroupPart.vue?raw'
import groupAddonPartCode from './parts/GroupAddonPart.vue?raw'

export default {
  setup() {
    return {
      inputPartCode, iconPartCode, clearablePartCode,
      groupPartCode, groupAddonPartCode,
    };
  },
  components: {
    InputPart, IconPart, ClearablePart,
    GroupPart, GroupAddonPart,
  },
}
</script>