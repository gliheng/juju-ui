<template>
  <example-list
    title="Popup"
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
    title: 'Single instance popups',
    part: 'PopupPart.vue',
  },
  {
    title: 'One-off popups',
    part: 'OneOffPart.vue',
  },
  {
    title: 'Loading popup',
    part: 'LoadingPart.vue',
  },
];
</script>
