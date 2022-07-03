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
    title: 'ItemRenderer prop',
    part: 'ItemRendererPart.vue',
  },
  {
    title: 'Default slot',
    part: 'SlotPart.vue',
  },
];
</script>
