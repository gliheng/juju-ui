<template>
  <example-list
    title="ProgressBar"
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
    title: 'Basic',
    part: 'ProgressPart.vue',
  },
  {
    title: 'Striped',
    part: 'StripedPart.vue',
  },
  {
    title: 'Indeterminate',
    part: 'IndeterminatePart.vue',
  },
];
</script>

<style scoped>
:deep(.j-progress) {
  margin: 10px 0;
}
</style>
