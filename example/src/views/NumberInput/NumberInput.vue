<template>
  <div>
    <h1>NumberInput</h1>
    <section>
      <h2>Button type</h2>
      <code-block :code="typePartCode">
        <type-part />
      </code-block>
    </section>
    <section>
      <h2>Set min, max and step</h2>
      <code-block :code="rangePartCode">
        <range-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import TypePart from './parts/TypePart.vue';
import typePartCode from './parts/TypePart.vue?raw';
import RangePart from './parts/RangePart.vue';
import rangePartCode from './parts/RangePart.vue?raw';

export default {
  components: {
    TypePart, RangePart,
  },
  setup() {
    return {
      typePartCode, rangePartCode,
    };
  },
}
</script>