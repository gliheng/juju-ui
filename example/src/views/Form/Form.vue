<template>
  <example-list
    title="Form"
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
    title: 'Basic Form',
    part: 'BasicFormPart.vue',
  },
  {
    title: 'Inline Form',
    part: 'InlineFormPart.vue',
  },
  {
    title: 'Label Postion',
    part: 'TopPositionFormPart.vue',
  },
];
</script>
