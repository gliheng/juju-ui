<template>
  <example-list
    title="Descriptions"
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
    title: 'Descriptions',
    part: 'DescriptionsPart.vue',
  },
  {
    title: 'Vertical descriptions',
    part: 'VerticalPart.vue',
  },
];
</script>
