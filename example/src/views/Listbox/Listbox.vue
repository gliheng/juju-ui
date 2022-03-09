<template>
  <div>
    <h1>Listbox</h1>
    <code-block :code="listboxPartCode">
      <listbox-part />
    </code-block>
  </div>
</template>

<script setup>
import ListboxPart from './parts/ListboxPart.vue';
import listboxPartCode from './parts/ListboxPart.vue?raw';
</script>
