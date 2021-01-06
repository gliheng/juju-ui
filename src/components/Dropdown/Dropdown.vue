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

<style lang="scss">
.j-dropdown {
  display: inline-block;
  position: relative;
  > .j-dropdown-label {
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: 0.5rem;
    cursor: default;
    outline: none;
    // padding-left: 1rem;
    border: 1px solid var(--neutral-color-lighter);
    transition: border-color 0.2s, box-shadow 0.2s;
    .j-dropdown-icon {
      margin-left: 0.5rem;
    }
    &:focus {
      box-shadow: $outline;
      border: 1px solid var(--primary-color-light);
    }
  }
  &[data-align="left"] {
    > .j-dropdown-menu {
      left: 0;
    }
  }
  &[data-align="right"] {
    > .j-dropdown-menu {
      right: 0;
    }
  }
  > .j-dropdown-menu {
    position: absolute;
    top: 100%;
    z-index: 1;
    padding: 0.5rem 0;
    margin-top: 2px;
    box-sizing: border-box;
    min-width: 100%;
    text-align: left;
    box-shadow: $shadow;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  .j-dropdown-item {
    padding: 0.5rem;
    cursor: default;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    &:hover {
      background-color: var(--primary-color-lighter);
    }
    > .j-icon {
      margin-right: 0.2rem;
    }
  }
  &[data-has-icon="false"] {
    .j-dropdown-item {
      > .j-icon {
        display: none;
      }
    }
  }
}
</style>