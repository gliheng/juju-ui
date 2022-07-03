<template>
  <example-list
    title="Menu"
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
    title: 'Basic menu',
    part: 'MenuPart.vue',
  },
  {
    title: 'Menu with icon',
    part: 'IconPart.vue',
  },
];
</script>
