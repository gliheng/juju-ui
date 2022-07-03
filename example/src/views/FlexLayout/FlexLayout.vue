<template>
  <example-list
    title="FlexLayout"
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
    title: 'Empty flex layout container with placeholder',
    part: 'EmptyPart.vue',
  },
  {
    title: 'Flex layout container with preset',
    part: 'FlexPart.vue',
  },
];
</script>
