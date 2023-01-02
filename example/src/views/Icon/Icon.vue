<template>
  <example-list
    title="Icon"
    :list="list"
    :modules="modules"
  >
    <template v-slot:footer="{ part }">
      <p v-if="part == 'SizePart.vue'">
        Icons are provided by <a href="https://ionicons.com/" target="_blank">ionicons</a>
      </p>
    </template>
  </example-list>
</template>

<script setup>
const modules = {
  components: import.meta.globEager('./parts/*.vue'),
  code: import.meta.globEager('./parts/*.vue', {as: 'raw'}),
};
const list = [
  {
    title: 'Built-in Icons',
    part: 'SizePart.vue',
  },
  {
    title: 'Using alt props to provide hover icon',
    part: 'AltPart.vue',
  },
  {
    title: 'Custom Icons using svg prop',
    part: 'RawPart.vue',
  },
];
</script>

<style scoped>
:deep(.demo) {
  color: rgb(238, 23, 123);
}
</style>