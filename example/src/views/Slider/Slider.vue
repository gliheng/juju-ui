<template>
  <div>
    <h1>Slider</h1>
    <section>
      <h2>Basic slider</h2>
      <code-block :code="sliderPartCode">
        <slider-part />
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
import SliderPart from './parts/SliderPart.vue';
import RangePart from './parts/RangePart.vue';
import sliderPartCode from './parts/SliderPart.vue?raw';
import rangePartCode from './parts/RangePart.vue?raw';

export default {
  setup() {
    return { sliderPartCode, rangePartCode };
  },
  components: {
    SliderPart, RangePart,
  },
}
</script>