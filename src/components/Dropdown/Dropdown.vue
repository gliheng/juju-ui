<template>
  <div class="j-dropdown" :data-align="align" :data-has-icon="hasIcon" @click.stop="toggleMenu">
    <slot v-if="hasButtonSlot" name="button"></slot>
    <div v-else class="j-dropdown-label" tabindex="0">
      <vnodes :nodes="selectedNode"></vnodes>
      <svg-icon class="j-dropdown-icon" name="chevron-down"></svg-icon>
    </div>
    <div class="j-dropdown-menu" v-if="menuOn"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { provide, ref, computed, watch, SetupContext } from 'vue';
import { useSwitch, useChildren } from '../../utils/vue';
import DropdownSeperator from './DropdownSeperator.vue';
import { DropdownItemSymbol } from './DropdownItem.vue';
import SvgIcon from '../SvgIcon.vue';
import Vnodes from '../Vnodes';
import { Dropdown, DropdownItem } from '../..';

export default {
  props: {
    type: String,
    align: {
      type: String,
      default: 'left',
    },
  },
  emits: ['change'],
  setup(_, { slots, emit }: SetupContext) {
    // add an index to dropdown-item
    let selected = ref(0);
    let [ menuOn, toggleMenu ] = useSwitch(false);

    watch(menuOn, (v) => {
      if (v) {
        document.addEventListener('click', function() {
          menuOn.value = false;
        }, {
          once: true,
        });
      }
    });

    let selectedNode = computed(() => {
      let idx = selected.value;
      if (slots.default) {
        let node = slots.default()[idx];
        return (node as any).children.default();
      }
      return [];
    });

    let hasButtonSlot = computed<boolean>(() => {
      return !!slots.button;
    });

    // dropdown-item use this callback to notify which item is clicked
    let children = useChildren(DropdownItemSymbol, {
      setActive(idx: number) {
        selected.value = idx;
        emit('change', idx);
      }
    });

    let hasIcon = computed(() => children.some((c: any) => !!c.props.icon));

    return {
      selected, selectedNode, menuOn, toggleMenu, hasButtonSlot, hasIcon,
    }
  },
  components: { SvgIcon, Vnodes },
}
</script>
