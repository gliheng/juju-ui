<template>
  <example-list
    title="Tooltip"
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
    title: 'Simple tooltip',
    part: 'TooltipPart.vue',
  },
  {
    title: 'Tooltip triggered by a click',
    part: 'TriggerPart.vue',
  },
];
</script>
