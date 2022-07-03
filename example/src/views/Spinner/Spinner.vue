<template>
  <example-list
    title="Spinner"
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
    title: 'Size',
    part: 'SpinnerPart.vue',
  },
  {
    title: 'Button',
    part: 'SpinnerButtonPart.vue',
  },
];
</script>

<style scoped>
:deep(.j-button) {
  margin: 0.2rem;
}
</style>