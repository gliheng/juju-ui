<template>
  <div>
    <h1>Select</h1>
    <div>
      <section>
        <h2>Simple select</h2>
        <code-block :code="selectPartCode">
          <select-part />
        </code-block>
      </section>
      <section>
        <h2>Select with icon</h2>
        <code-block :code="iconPartCode">
          <icon-part />
        </code-block>
      </section>
      <section>
        <h2>Select with multiple selection</h2>
        <code-block :code="multiplePartCode">
          <multiple-part />
        </code-block>
      </section>
      <section>
        <h2>Customize select display</h2>
        <code-block :code="slotPartCode">
          <slot-part />
        </code-block>
      </section>
    </div>
  </div>
</template>

<script>
import SelectPart from './parts/SelectPart.vue';
import IconPart from './parts/IconPart.vue';
import MultiplePart from './parts/MultiplePart.vue';
import SlotPart from './parts/SlotPart.vue';
import selectPartCode from './parts/SelectPart.vue?raw';
import iconPartCode from './parts/IconPart.vue?raw';
import multiplePartCode from './parts/MultiplePart.vue?raw';
import slotPartCode from './parts/SlotPart.vue?raw';

export default {
  setup() {
    return {
      selectPartCode, iconPartCode, multiplePartCode, slotPartCode,
    };
  },
  components: {
    SelectPart, IconPart, MultiplePart, SlotPart,
  },
};
</script>