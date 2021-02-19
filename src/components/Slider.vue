<template>
  <div class="j-slider">
    <div class="j-slider-inner" @mousedown.prevent="startDragHandle">
      <div class="j-slider-track" ref="trackRef">
        <div class="j-slider-bar" :style="`width: ${pct}%;`" />
      </div>
      <div class="j-slider-handle" :style="`left: ${pct}%`"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from 'vue';

export default {
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }: SetupContext) {
    let pct = ref(value2pct(props.modelValue, props.min, props.max));
    let trackRef = ref<HTMLElement>();

    let startX = 0, width = 0;
    function startDragHandle(evt: MouseEvent) {
      let rect = trackRef.value!.getBoundingClientRect();
      width = rect.width;
      let dx = evt.clientX - rect.left;
      setValue(dx);
      startX = evt.clientX - dx;
      document.addEventListener('mousemove', dragHandle);
      document.addEventListener('mouseup', stopDragHandle, { once: true });
    }

    function dragHandle(evt: MouseEvent) {
      let dx = evt.clientX - startX;
      setValue(dx);
    }

    function setValue(dx: number) {
      dx = Math.max(dx, 0);
      dx = Math.min(dx, width);
      let v = dx / width * 100;
      pct.value = v;
      emit('update:modelValue', pct2value(v, props.min, props.max, props.step));
    }

    function stopDragHandle(evt: MouseEvent) {
      evt.preventDefault();
      document.removeEventListener('mousemove', dragHandle);
    }
    return {
      pct, startDragHandle, trackRef,
    };
  }
}

function value2pct(value: number, min: number, max: number): number {
  let pct = (value - min) / (max - min);
  pct = Math.min(100, Math.max(pct, 0));
  return pct * 100;
}

function pct2value(pct: number, min: number, max: number, step: number): number {
  let v = min + (max - min) * pct / 100;
  let r = Math.floor((v - min) / step);
  let m = min + r * step;
  let n = m + step;
  if (v - m <= n - v) {
    return m;
  }
  return n;
}

</script>

<style src="../assets/styles/Slider.scss"></style>