<template>
  <example-list
    title="Splitter"
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
    title: 'Horizontal Splitter',
    part: 'HorizontalPart.vue',
  },
  {
    title: 'Vertical Splitter',
    part: 'VerticalPart.vue',
  },
];
</script>
