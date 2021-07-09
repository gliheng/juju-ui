<template>
  <div>
    <h1>Listbox</h1>
    <code-block :code="listboxPartCode">
      <listbox-part />
    </code-block>
  </div>
</template>

<script>
import ListboxPart from './parts/ListboxPart.vue';
import listboxPartCode from './parts/ListboxPart.vue?raw';

export default {
  setup() {
    return { listboxPartCode };
  },
  components: {
    ListboxPart,
  },
}
</script>
