<template>
  <div>
    <h1>Splitter</h1>
    <section>
      <code-block :code="horizontalPartCode">
        <horizontal-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import HorizontalPart from './parts/HorizontalPart.vue';
import horizontalPartCode from './parts/HorizontalPart.vue?raw';

export default {
  setup() {
    return {
      horizontalPartCode,
    };
  },
  components: {
    HorizontalPart,
  },
};
</script>
