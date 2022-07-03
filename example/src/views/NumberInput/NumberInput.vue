<template>
  <example-list
    title="NumberInput"
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
    title: 'Button type',
    part: 'TypePart.vue',
  },
  {
    title: 'Set min, max and step',
    part: 'RangePart.vue',
  },
  {
    title: 'Slider',
    part: 'SliderPart.vue',
  },
];
</script>
