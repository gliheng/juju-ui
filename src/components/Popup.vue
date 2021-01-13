<template>
  <div class="j-popup" :style="{zIndex: zIndex}">
    <transition name="j-scale">
      <div v-if="$props.modelValue" class="j-popup-inner j-shadow-5" ref="elm"
        :style="`width: ${width}px; height:${height}px; left: ${pos.x}px; top: ${pos.y}px;`">
        <header>
          <h1 @mousedown="startDrag">{{ title }}</h1>
          <a class="close" @click="$emit('dismiss', 'close')">
            <svg-icon name="close"></svg-icon>
          </a>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <j-button v-if="type == 'confirm'" outlined @click="$emit('dismiss', 'cancel')">Cancel</j-button>
          <j-button @click="$emit('accept')">OK</j-button>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  reactive, ref, watchEffect, onUnmounted,
  getCurrentInstance, SetupContext,
} from 'vue';
import SvgIcon from './SvgIcon.vue';
import Button from './Button.vue';
import * as DepthManager from '../utils/depth-manager';

export default {
  props: {
    title: String,
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 300,
    },
    modal: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'alert',
      // TODO: sadly vscode lint does not support this yet, should open later
      // validator(v: string) {
      //   return ['alert', 'confirm'].indexOf(v) != -1;
      // },
    },
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ['dismiss', 'accept'],
  setup(props, { emit }: SetupContext) {
    let pos = reactive({ x: 0, y: 0 });
    let elm = ref<HTMLElement | null>(null);
    let inst = getCurrentInstance();
    
    let startX = 0, startY = 0, boundX = 0, boundY = 0;
    function startDrag(evt: MouseEvent) {
      if (!elm.value) return;

      evt.preventDefault();

      startX = evt.clientX - pos.x;
      startY = evt.clientY - pos.y;
      const PADDING = 10;
      boundX = Math.max((document.documentElement.clientWidth - elm.value.clientWidth) / 2 - PADDING, 0);
      boundY = Math.max((document.documentElement.clientHeight - elm.value.clientHeight) / 2 - PADDING, 0);
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', stopDrag, { once: true });

      DepthManager.touch(inst!.uid);
    }

    function move(evt: MouseEvent) {
      let x = evt.clientX - startX;
      if (x > boundX) x = boundX;
      if (x < -boundX) x = -boundX;
      pos.x = x;

      let y = evt.clientY - startY;
      if (y > boundY) y = boundY;
      if (y < -boundY) y = -boundY;
      pos.y = y;
    }

    function stopDrag(evt: MouseEvent) {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stopDrag);
    }

    let zIndex = DepthManager.alloc(inst!.uid);
    watchEffect(() => {
      if (props.modelValue) {
        DepthManager.open(inst!.uid, props.modal);
      } else {
        DepthManager.close(inst!.uid)
      }
    });
    onUnmounted(() => {
      DepthManager.revoke(inst!.uid);
    });

    return { elm, startDrag, pos, zIndex };
  },
  components: { SvgIcon, JButton: Button },
}
</script>
