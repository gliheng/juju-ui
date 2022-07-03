<template>
  <example-list
    title="Carousel"
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
    title: 'Carousel',
    part: 'CarouselPart.vue',
  },
  {
    title: 'Vertical carousel',
    part: 'VerticalPart.vue',
  },
];
</script>
