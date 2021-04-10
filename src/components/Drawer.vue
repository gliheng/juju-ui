<template>
  <transition :name="`j-slide-${side}`">
    <div v-if="modelValue" class="j-drawer" :class="`j-shadow-${elevation}`" :data-side="side" :style="{ zIndex }">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { getCurrentInstance, watchEffect, onUnmounted } from 'vue';
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
  setup(props, { emit }) {
    let inst = getCurrentInstance();
    let uid = inst!.uid;
    let zIndex = DepthManager.alloc(uid);
    watchEffect(() => {
      if (props.modelValue) {
        DepthManager.open(uid, true, () => {
          emit('update:modelValue', false);
        });
      } else {
        DepthManager.close(uid)
      }
    });
    onUnmounted(() => {
      DepthManager.revoke(uid);
    });
    return { zIndex };
  },
};
</script>

<style src="../assets/styles/Drawer.scss"></style>