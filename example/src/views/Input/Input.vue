<template>
  <example-list
    title="Input"
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
    title: 'Input',
    part: 'InputPart.vue',
  },
  {
    title: 'Prepend and append icons',
    part: 'IconPart.vue',
  },
  {
    title: 'Clearable input',
    part: 'ClearablePart.vue',
  },
  {
    title: 'Input group',
    part: 'GroupPart.vue',
  },
  {
    title: 'Group addons',
    part: 'GroupAddonPart.vue',
  },
  {
    title: 'Password input',
    part: 'PasswordPart.vue',
  },
];
</script>
