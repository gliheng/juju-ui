<template>
  <div>
    <h1>FlexLayout</h1>
    <section>
      <h2>Empty flex layout container with placeholder</h2>
      <code-block :code="emptyPartCode">
        <empty-part />
      </code-block>
      <h2>Flex layout container with preset</h2>
      <code-block :code="flexPartCode">
        <flex-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import EmptyPart from './parts/EmptyPart.vue';
import emptyPartCode from './parts/EmptyPart.vue?raw';
import FlexPart from './parts/FlexPart.vue';
import flexPartCode from './parts/FlexPart.vue?raw';

export default {
  setup() {
    return {
      emptyPartCode,
      flexPartCode,
    };
  },
  components: {
    EmptyPart,
    FlexPart,
  },
};
</script>
