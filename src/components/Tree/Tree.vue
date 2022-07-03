<template>
  <div class="j-tree">
    <tree-item
      v-for="(item, i) in data ?? []"
      :key="keyField ? item[keyField] : i"
      :key-field="keyField"
      :item="item"
      :level="level"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, inject } from 'vue';
import TreeItem from './TreeItem.vue';
import { treeInjectKey, TreeItemType } from './constants';

export default defineComponent({
  components: {
    TreeItem,
  },
  props: {
    data: Array as PropType<TreeItemType[]>,
    level: {
      type: Number,
      default: 0,
    },
    keyField: String,
    itemRenderer: {
      type: String as PropType<'nav' | 'default'>,
      default: 'default',
    },
  },
  setup(props, { slots }) {
    let data = inject(treeInjectKey, null);
    if (!data) {
      provide(treeInjectKey, {
        slots,
        keyField: props.keyField,
        itemRenderer: props.itemRenderer,
      });
    }

    return {
      
    };
  },
});
</script>

<style src="./Tree.scss"></style>