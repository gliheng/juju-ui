<template>
  <example-list
    title="Select"
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
    title: 'Simple select',
    part: 'SelectPart.vue',
  },
  {
    title: 'Select with icon',
    part: 'IconPart.vue',
  },
  {
    title: 'Select with multiple selection',
    part: 'MultiplePart.vue',
  },
  {
    title: 'Customize select display',
    part: 'SlotPart.vue',
  },
];
</script>
