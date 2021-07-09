<template>
  <div>
    <h1>FlexLayout</h1>
    <section>
      <code-block :code="flexPartCode">
        <flex-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import FlexPart from './parts/FlexPart.vue';
import flexPartCode from './parts/FlexPart.vue?raw';

export default {
  setup() {
    return {
      flexPartCode,
    };
  },
  components: {
    FlexPart,
  },
};
</script>
