<template>
  <example-list
    title="Scroller"
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
    title: 'Both directions',
    part: 'ScrollerPart.vue',
  },
  {
    title: 'Vertical',
    part: 'VerticalPart.vue',
  },
  {
    title: 'Horizontal',
    part: 'HorizontalPart.vue',
  },
];
</script>
