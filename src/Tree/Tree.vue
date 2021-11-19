<template>
  <div class="j-tree">
    <tree-item v-for="(item, i) in data" :key="keyField ? item[keyField] : i"
      :label="item.label" :icon="item.icon" :key-field="keyField"
      :children="item.children" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeItem from './TreeItem.vue';

export default defineComponent({
  components: {
    TreeItem,
  },
  name: 'j-tree',
  props: {
    data: {
      type: Array,
      default: [],
    },
    keyField: String,
  },
});
</script>

<style src="./Tree.scss"></style>