<template>
  <example-list
    title="Button"
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
    title: 'Basic',
    part: 'BasicPart.vue',
  },
  {
    title: 'Colors',
    part: 'ColorPart.vue',
  },
  {
    title: 'Variants',
    part: 'VariantPart.vue',
  },
  {
    title: 'Size',
    part: 'SizePart.vue',
  },
  {
    title: 'Icon',
    part: 'IconPart.vue',
  },
  {
    title: 'Loading',
    part: 'LoadingPart.vue',
  },
  {
    title: 'SplitButton',
    part: 'SplitPart.vue',
  },
  {
    title: 'ButtonGroup',
    part: 'ButtonGroupPart.vue',
  },
  {
    title: 'ToggleButton',
    part: 'TogglePart.vue',
  },
  {
    title: 'ToggleButtonGroup',
    part: 'ToggleButtonGroupPart.vue',
  },
  {
    title: 'UploadButton',
    part: 'UploadPart.vue',
  },
];
</script>

<style scoped>
:deep(.j-button) {
  margin: 0.2rem;
}
</style>