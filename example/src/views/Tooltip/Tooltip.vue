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
      <code-block :code="triggerPartCode">
        <trigger-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import TooltipPart from './parts/TooltipPart.vue';
import TriggerPart from './parts/TriggerPart.vue';
import tooltipPartCode from './parts/TooltipPart.vue?raw';
import triggerPartCode from './parts/TriggerPart.vue?raw';

export default {
  setup() {
    return { tooltipPartCode, triggerPartCode };
  },
  components: {
    TooltipPart, TriggerPart,
  },
}
</script>