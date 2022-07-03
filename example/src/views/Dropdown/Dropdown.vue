<template>
  <example-list
    title="Dropdown"
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
    title: 'Dropdown',
    part: 'DropdownPart.vue',
  },
  {
    title: 'Trigger by hover',
    part: 'HoverDropdownPart.vue',
  },
];
</script>
