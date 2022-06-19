<template>
  <example-list
    title="Checkbox"
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
    title: 'Checkbox group',
    part: 'GroupPart.vue',
  },
  {
    title: 'Boolean checkbox',
    part: 'BooleanPart.vue',
  },
  {
    title: 'Tri state checkbox',
    part: 'TriStatePart.vue',
  },
];
</script>

<style scoped>
:deep(.j-checkbox) {
  margin-right: 10px;
}
</style>