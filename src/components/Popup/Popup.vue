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
        <footer v-if="$slots['footer']">
          <slot name="footer" :accept="accept" :dismiss="dismiss"></slot>
        </footer>
        <footer v-else>
          <j-button v-if="type == 'confirm'" outlined @click="dismiss">Cancel</j-button>
          <j-button @click="accept">OK</j-button>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watchEffect,
  onUnmounted,
  getCurrentInstance,
  PropType,
} from 'vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import Button from '../Button/Button.vue';
import * as DepthManager from '@utils/depth-manager';

export default defineComponent({
  components: { SvgIcon, JButton: Button },
  props: {
    title: String,
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
    },
    modal: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<"alert" | "confirm">,
    },
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ['dismiss', 'accept'],
  setup(props, { emit }) {
    let pos = reactive({ x: 0, y: 0 });
    let elm = ref<HTMLElement | null>(null);
    let inst = getCurrentInstance();
    let uid = inst!.uid;
    
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

      DepthManager.touch(uid);
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

    function accept() {
      emit('accept');
    }
    
    function dismiss() {
      emit('dismiss', 'cancel')
    }
    
    let zIndex = DepthManager.alloc(uid);
    watchEffect(() => {
      if (props.modelValue) {
        DepthManager.open(uid, props.modal);
      } else {
        DepthManager.close(uid)
      }
    });
    onUnmounted(() => {
      DepthManager.revoke(uid);
    });

    return {
      elm,
      startDrag,
      pos,
      zIndex,
      accept,
      dismiss,
    };
  },
});
</script>

<style src="./Popup.scss" lang="scss"></style>