<template>
  <transition :name="`j-slide-${side}`">
    <div v-if="modelValue" class="j-drawer" :class="`j-shadow-${elevation}`" :data-side="side" :style="{ zIndex }">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { getCurrentInstance, watchEffect, onUnmounted, SetupContext } from 'vue';
import { show as showBackdrop, hide as hideBackdrop } from '../utils/backdrop';
import * as DepthManager from '../utils/depth-manager';

export default {
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    side: {
      type: String,
      default: 'left',
    },
    elevation: {
      type: Number,
      default: 10,
    },
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  setup(props, { emit }: SetupContext) {
    let inst = getCurrentInstance();
    let zIndex = DepthManager.alloc(inst!.uid);
    watchEffect(() => {
      if (props.modelValue) {
        DepthManager.open(inst!.uid, true, () => {
          emit('update:modelValue', false);
        });
      } else {
        DepthManager.close(inst!.uid)
      }
    });
    onUnmounted(() => {
      DepthManager.revoke(inst!.uid);
    });
    return { zIndex };
  },
};
</script>

<style lang="scss">
.j-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  $w: 20rem;
  $h: 10rem;
  padding: $margin;
  box-sizing: border-box;
  z-index: 1000;
  background-color: var(--background-color);
  color: var(--text-color);
  &[data-side="left"] {
    width: $w;
    right: auto;
  }
  &[data-side="right"] {
    width: $w;
    left: auto;
  }
  &[data-side="top"] {
    height: $h;
    bottom: auto;
  }
  &[data-side="bottom"] {
    height: $h;
    top: auto;
  }
}
</style>