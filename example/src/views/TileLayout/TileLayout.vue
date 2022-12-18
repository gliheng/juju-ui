<template>
  <example-list
    title="TileLayout"
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
    title: 'Empty tile layout container with placeholder',
    part: 'EmptyPart.vue',
  },
  {
    title: 'Basic tile',
    part: 'BasicPart.vue',
  },
];
</script>
