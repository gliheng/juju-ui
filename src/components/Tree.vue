<template>
  <div class="j-tree">
    <j-tree-item v-for="(item, i) in data" :key="keyField ? item[keyField] : i"
      :label="item.label" :icon="item.icon" :key-field="keyField"
      :children="item.children" />
  </div>
</template>

<script lang="ts">
import JTreeItem from './TreeItem.vue';

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
    JTreeItem,
  },
}
</script>

<style lang="scss">
.j-tree-item {
  > .j-tree-row {
    position: relative;
    overflow: hidden;
    display: flex;
    cursor: default;
    border-radius: 3px;
    padding: $margin 2*$margin;
    padding-right: $margin;
    &:hover {
      background-color: var(--primary-color-lighter);
    }
    > .j-tree-arrow {
      transition: transform 0.2s $curve;
    }
    &[data-open="true"] {
      > .j-tree-arrow {
        transform: rotateZ(90deg);
      }
    }
    > span {
      flex: 1;
    }
    > .j-tree-icon {
      margin-right: 0.5rem;
    }
  }
  > .j-tree {
    margin-left: 1rem;
  }
}
</style>