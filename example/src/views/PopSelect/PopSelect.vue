<template>
  <example-list
    title="PopSelect"
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
    title: 'Simple PopSelect',
    part: 'PopSelectPart.vue',
  },
  {
    title: 'PopSelect with input',
    part: 'InputPart.vue',
  },
];
</script>
