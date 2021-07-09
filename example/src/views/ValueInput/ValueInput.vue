<template>
  <div>
    <h1>ValueInput</h1>
    <section>
      <h2>Button type</h2>
      <code-block :code="valueInputPartCode">
        <value-input-part />
      </code-block>
    </section>
    <section>
      <h2>Set min, max and step</h2>
      <code-block :code="rangePartCode">
        <range-part />
      </code-block>
    </section>
    <section>
      <h2>Slider type</h2>
      <code-block :code="sliderPartCode">
        <slider-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import ValueInputPart from './parts/ValueInputPart.vue';
import valueInputPartCode from './parts/ValueInputPart.vue?raw';
import rangePartCode from './parts/RangePart.vue?raw';
import RangePart from './parts/RangePart.vue';
import SliderPart from './parts/SliderPart.vue';
import sliderPartCode from './parts/SliderPart.vue?raw';

export default {
  setup() {
    return {
      valueInputPartCode, rangePartCode, sliderPartCode,
    };
  },
  components: {
    ValueInputPart, RangePart, SliderPart,
  },
}
</script>