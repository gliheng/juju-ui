<template>
  <div>
    <h1>ColorWheel</h1>
    <code-block :code="colorWheelPartCode">
      <color-wheel-part />
    </code-block>
  </div>
</template>

<script>
import ColorWheelPart from './parts/ColorWheelPart.vue';
import colorWheelPartCode from './parts/ColorWheelPart.vue?raw';

export default {
  setup() {
    return {
      colorWheelPartCode,
    };
  },
  components: {
    ColorWheelPart,
  },
}
</script>
