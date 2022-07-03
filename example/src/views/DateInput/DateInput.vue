<template>
  <example-list
    title="DateInput"
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
    title: 'Single date',
    part: 'SingleDatePart.vue',
  },
  {
    title: 'Double date',
    part: 'DoubleDatePart.vue',
  },
];
</script>
