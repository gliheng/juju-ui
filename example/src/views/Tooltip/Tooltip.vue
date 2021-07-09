<template>
  <h1>Tooltip</h1>
  <div>
    <section>
      <h1>Simple tooltip</h1>
      <code-block :code="tooltipPartCode">
        <tooltip-part />
      </code-block>
    </section>
    <section>
      <h2>Tooltip triggered by a click</h2>
      <code-block :code="clickPartCode">
        <click-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import TooltipPart from './parts/TooltipPart.vue';
import ClickPart from './parts/ClickPart.vue';
import tooltipPartCode from './parts/TooltipPart.vue?raw';
import clickPartCode from './parts/ClickPart.vue?raw';

export default {
  setup() {
    return { tooltipPartCode, clickPartCode };
  },
  components: {
    TooltipPart, ClickPart,
  },
}
</script>