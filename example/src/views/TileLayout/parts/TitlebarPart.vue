<template>
  <j-tile-layout
    :library="libraryWithTitlebar"
    :preset="preset"
  >
  </j-tile-layout>
</template>

<script setup>
import { libraryWithTitlebar } from './library';
const preset = [
  {
    use: 'pane-a',
    x: 0,
    y: 0,
    w: 2,
    h: 2,
  },
  {
    use: 'pane-b',
    x: 2,
    y: 0,
    w: 2,
    h: 2,
  },
  {
    use: 'pane-c',
    x: 4,
    y: 0,
    w: 2,
    h: 2,
  },
  {
    use: 'pane-d',
    x: 6,
    y: 0,
    w: 2,
    h: 2,
  },
  {
    use: 'pane-e',
    x: 8,
    y: 0,
    w: 2,
    h: 2,
  },
];
</script>

<style lang="scss" scoped>
</style>