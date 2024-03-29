<template>
  <Teleport to="body">
    <div class="j-popup" :class="popupClass" :style="{zIndex: zIndex}">
      <transition name="j-scale">
        <div v-if="modelValue"
          class="j-popup-inner j-shadow-5"
          ref="elm"
          :style="moveStyle"
        >
          <header>
            <h1 @mousedown="startDrag">{{ title }}</h1>
            <a
              class="close"
              @click="$emit('dismiss', 'close')"
            >
              <j-icon name="close" />
            </a>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer v-if="$slots['footer']">
            <slot
              name="footer"
              :accept="accept"
              :dismiss="dismiss"
            />
          </footer>
          <footer v-else>
            <j-button v-if="type == 'confirm'"
              outlined
              @click="dismiss"
            >{{ dismissLabel }}</j-button>
            <j-button
              :loading="loading"
              @click="accept"
            >{{ acceptLabel }}</j-button>
          </footer>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  watchEffect,
  onUnmounted,
  getCurrentInstance,
  PropType,
} from 'vue';
import JIcon from '../Icon/Icon.vue';
import JButton from '../Button/Button.vue';
import * as DepthManager from '@utils/depth-manager';

export default defineComponent({
  components: { JIcon, JButton },
  props: {
    title: String,
    popupClass: String,
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
    acceptLabel: {
      type: String,
      default: 'OK',
    },
    dismissLabel: {
      type: String,
      default: 'Cancel',
    },
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    loading: {
      type: Boolean,
    },
  },
  emits: ['dismiss', 'accept'],
  setup(props, { emit }) {
    let pos = reactive({ x: 0, y: 0 });
    let elm = ref<HTMLElement | null>(null);
    let inst = getCurrentInstance();
    let uid = inst!.uid;
    let moveStyle = computed(() => {
      let { width, height } = props;
      return `width: ${width}px; height:${height}px; left: ${pos.x}px; top: ${pos.y}px;`;
    });

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
      if (!props.loading) {
        emit('accept');
      }
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
      moveStyle,
    };
  },
});
</script>

<style src="./Popup.scss" lang="scss"></style>