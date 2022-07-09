<template>
  <div class="j-tree" :data-tree-root="isTreeRoot" @click="onClick">
    <tree-item
      v-for="(item, i) in data ?? []"
      :key="keyField ? item[keyField] : i"
      :key-field="keyField"
      :label-field="labelField"
      :item="item"
      :level="level"
      :path="path"
      :index="i"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, inject, ref } from 'vue';
import { treeInjectKey, TreeItemType } from './constants';
import TreeItem from './TreeItem';

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
    path: {
      type: String,
      default: '',
    },
    keyField: String,
    labelField: String,
    display: {
      type: String,
      default: 'indent,chevron,icon,label,spacer,extension',
    },
  },
  emits: ['item-click'],
  setup(props, { slots, emit }) {
    let data = inject(treeInjectKey, null);
    let onClick;
    let isTreeRoot = false;
    if (!data) {
      isTreeRoot = true;
      const selected = ref();
      provide(treeInjectKey, {
        slots,
        keyField: props.keyField,
        labelField: props.labelField,
        display: props.display.split(',').map(e => e.trim()),
        selected,
      });

      // Only need to listen on root level
      onClick = (evt: MouseEvent) => {
        const el = (evt.target as HTMLElement).closest('[data-tree-path]');
        if (el instanceof HTMLElement) {
          const path = el.dataset.treePath!;
          selected.value = path;
          emit('item-click', evt, path);
        }
      }
    }

    return {
      onClick,
      isTreeRoot,
    };
  },
});
</script>

<style src="./Tree.scss"></style>