<template>
  <example-list
    title="AutoComplete"
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
    part: 'AutoCompletePart.vue',
  },
  {
    part: 'AutoCompleteWithOptionsPart.vue',
  },
];
</script>
