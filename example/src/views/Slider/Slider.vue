<template>
  <example-list
    title="Slider"
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
    title: 'Basic slider',
    part: 'SliderPart.vue',
  },
  {
    title: 'Set min, max and step',
    part: 'RangePart.vue',
  },
];
</script>
