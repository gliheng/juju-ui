<template>
  <example-list
    title="Chip"
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
    title: 'Text chip',
    part: 'TextPart.vue',
  },
  {
    title: 'Chip with icon',
    part: 'IconPart.vue',
  },
  {
    title: 'Chip with close icon',
    part: 'ClosablePart.vue',
  },
];
</script>

<style scoped>
:deep(.j-chip) {
  margin: 0 0.2rem;
}
</style>