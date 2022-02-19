<template>
  <div>
    <h1>ripple directive</h1>
    <code-block :code="ripplePartCode">
      <ripple-part />
    </code-block>
    <p>Make sure the container has style
      <code>
        position: relative; overflow: hidden;
      </code>
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import RipplePart from './parts/RipplePart.vue';
import ripplePartCode from './parts/RipplePart.vue?raw';

export default defineComponent({
  setup() {
    return {
      ripplePartCode,
    };
  },
  components: {
    RipplePart,
  },
});
</script>