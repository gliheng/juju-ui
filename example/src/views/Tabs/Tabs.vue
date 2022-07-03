<template>
  <example-list
    title="Tabs"
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
    title: 'Basic tabs',
    part: 'BasicPart.vue',
  },
  {
    title: 'Icon side',
    part: 'IconPart.vue',
  },
  {
    title: 'Tabs with icon and card type',
    part: 'CardPart.vue',
  },
  {
    title: 'Managed tabs',
    part: 'ManagedPart.vue',
  },
];
</script>
