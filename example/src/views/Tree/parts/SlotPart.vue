<template>
  <j-tree class="tree" :data="treeModel">
    <template #extension="{ item }">
      <j-button flat round icon="ellipsis-horizontal" />
    </template>
  </j-tree>
</template>

<script setup>
import { reactive } from 'vue';

let treeModel = reactive([
  {label: 'Arts', icon: 'list', children: [
    {label: 'Music', icon: 'list', children: [
      {label: 'Voilin'},
      {label: 'Piano'},
      {label: 'Singing'},
    ]},
    {label: 'Dancing', icon: 'list', children: [
      {label: 'Classic'},
      {label: 'Jazz'},
      {label: 'Ballet'},
    ]}
  ]},
  {label: 'Languages', icon: 'list', children: [
    {label: 'English'},
    {label: 'Chinese'},
    {label: 'Japanese'},
  ]},
  {label: 'Sports', icon: 'list', children: [
    {label: 'Swimming'},
    {label: 'Jogging'},
    {label: 'Boxing'},
  ]},
]);
</script>

<style scoped>
.tree {
  max-width: 300px;
}
</style>
