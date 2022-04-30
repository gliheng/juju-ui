<template>
  <div
    class="j-carousel-indicator"
    ref="indicatorRef"
    :data-direction="direction"
    :data-vertical="vertical"
    @click="slide"
  >
    <div
      v-for="i in total"
      class="j-carousel-dot"
      :ref="setRef.bind(null, i - 1)"
      :key="i"
      :data-i="i - 1" />
    <div
      v-if="showActiveDot"
      class="j-carousel-active-dot"
      :style="activeDotStyle" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed, watch } from 'vue';

export default defineComponent({
  props: {
    vertical: Boolean,
    modelValue: {
      type: Number,
      required: true,
    },
    activeDotSize: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let dotsRef = ref<HTMLElement[]>([]);
    let indicatorRef = ref<HTMLElement>();
    
    let direction = ref();
    let activeDotStyle = reactive<{
      left?: string;
      right?: string;
      top?: string;
      bottom?: string;
    }>({});

    onMounted(() => {
      focus(props.modelValue);
    });

    watch(() => props.modelValue, (i, old) => {
      focus(i, old);
    });

    const showActiveDot = computed(() => {
      if (props.vertical) {
        return activeDotStyle.top && activeDotStyle.bottom;
      }
      return activeDotStyle.left && activeDotStyle.right;
    });

    /** Move active indicator to @i dot */
    function focus(i: number, j?: number) {
      // Use directioned animation
      if (typeof j == 'number') {
        direction.value = i > j ? 'forward' : 'backward';
      }

      let el = dotsRef.value[i];
      if (el) {
        if (props.vertical) {
          let center = el.offsetTop + el.clientHeight / 2;
          let top = center - props.activeDotSize / 2;
          let bottom = indicatorRef.value!.clientHeight - (center + props.activeDotSize / 2);
          activeDotStyle.top = `${top}px`;
          activeDotStyle.bottom = `${bottom}px`;
        } else {
          let center = el.offsetLeft + el.clientWidth / 2;
          let left = center - props.activeDotSize / 2;
          let right = indicatorRef.value!.clientWidth - (center + props.activeDotSize / 2);
          activeDotStyle.left = `${left}px`;
          activeDotStyle.right = `${right}px`;
        }
      }
    }

    function slide(evt: MouseEvent) {
      let i = (evt.target as HTMLDivElement).dataset.i;
      if (i) {
        let idx = parseInt(i);
        focus(idx, props.modelValue);
        emit('update:modelValue', idx);
      }
    }

    return {
      slide,
      indicatorRef,
      setRef(i: number, el: HTMLElement) {
        dotsRef.value[i] = el;
      },
      direction,
      activeDotStyle,
      showActiveDot,
    };
  },
});
</script>
