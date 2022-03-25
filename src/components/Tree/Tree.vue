<template>
  <div class="j-tree">
    <tree-item
      v-for="(item, i) in data"
      :key="keyField ? item[keyField] : i"
      :label="item.label"
      :icon="item.icon"
      :key-field="keyField"
      :children="item.children"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TreeItem from './TreeItem.vue';

type TreeItem = {
  [key: string]: string;
} & {
  children?: TreeItem[];
}

export default defineComponent({
  components: {
    TreeItem,
  },
  props: {
    data: {
      type: Array as PropType<TreeItem[]>,
      default() {
        return [];
      },
    },
    keyField: String,
  },
});
</script>

<style src="./Tree.scss"></style>