<template>
  <div class="j-toggle-button-group">
    <vnodes :nodes="nodes" />
  </div>
</template>

<script lang="ts">
import { computed, SetupContext } from 'vue';
import ToggleButton from './ToggleButton.vue';
import Vnodes from './Vnodes';

export default {
  props: {
    modelValue: Number,
    // When this option is on, this group can not be toggled off by clicked an on button
    force: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots, emit }: SetupContext) {
    let nodes = computed(() => {
      if (slots.default) {
        let nodes = slots.default();

        nodes.forEach((n, idx) => {
          if (n.type == ToggleButton) {
            n.props = Object.assign({}, n.props, {
              'modelValue': props.modelValue === idx,
              'onUpdate:modelValue': (v: boolean) => {
                if (v) {
                  emit('update:modelValue', idx);
                } else if (!props.force) {
                  emit('undate:modelValue', undefined);
                }
              }
            });
          }
        });
        return nodes;
      }
      return [];
    });
    return { nodes };
  },
  components: { Vnodes },
}
</script>

<style lang="scss">
.j-toggle-button-group {
  white-space: nowrap;
  > .j-button {
    border-radius: 0;
    margin: 0!important;
    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    &.is-outlined:not(:last-child) {
      border-right: none;
    }
  }
}
</style>