<template>
  <example-list
    title="AnimatedIcon"
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
    title: 'Menu Opener',
    part: 'MenuOpener.vue',
  },
  {
    title: 'Menu Toggle',
    part: 'MenuToggle.vue',
  },
];
</script>
