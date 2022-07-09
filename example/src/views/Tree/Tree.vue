<template>
  <example-list
    title="Tree"
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
    title: 'Simple tree',
    part: 'TreePart.vue',
  },
  {
    title: 'Display prop',
    part: 'DisplayPart.vue',
  },
  {
    title: 'Default slot',
    part: 'SlotPart.vue',
  },
];
</script>
