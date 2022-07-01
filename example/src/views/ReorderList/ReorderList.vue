<template>
  <example-list
    title="ReorderList"
    :list="list"
    :modules="modules"
  />
</template>

<script setup>
const modules = {
  components: import.meta.globEager('./parts/*.vue'),
  code: import.meta.globEager('./parts/*.vue', {as: 'raw'}),
};
const list = [
  {
    part: 'ReorderListPart.vue',
  },
  {
    title: 'Removable list',
    part: 'RemovableReorderListPart.vue',
  },
  {
    title: 'Customize list with slot',
    part: 'SlotPart.vue',
  },
  {
    title: 'Multiple list lane',
    part: 'ReorderListGroupPart.vue',
  }
];
</script>
