<template>
  <div class="j-tree">
    <tree-item v-for="(item, i) in data" :key="keyField ? item[keyField] : i"
      :label="item.label" :icon="item.icon" :key-field="keyField"
      :children="item.children" />
  </div>
</template>

<script lang="ts">
import TreeItem from './_TreeItem.vue';

export default {
  name: 'j-tree',
  props: {
    data: {
      type: Array,
      default: [],
    },
    keyField: String,
  },
  components: {
    TreeItem,
  },
}
</script>

<style src="../../assets/styles/Tree.scss"></style>