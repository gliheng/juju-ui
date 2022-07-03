<template>
  <example-list
    title="Calendar"
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
    title: '',
    part: 'CalendarPart.vue',
  },
];
</script>
