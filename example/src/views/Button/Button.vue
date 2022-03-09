<template>
  <div>
    <h1>Button</h1>
    <section>
      <h2>Basic</h2>
      <code-block :code="basicPartCode">
        <basic-part />
      </code-block>
    </section>
    <section>
      <h2>Colors</h2>
      <code-block :code="colorPartCode">
        <color-part />
      </code-block>
    </section>
    <section>
      <h2>Variants</h2>
      <code-block :code="variantPartCode">
        <variant-part />
      </code-block>
    </section>
    <section>
      <h2>Size</h2>
      <code-block :code="sizePartCode">
        <size-part />
      </code-block>
    </section>
    <section>
      <h2>Icon</h2>
      <code-block :code="iconPartCode">
        <icon-part />
      </code-block>
    </section>
    <section>
      <h2>Loading</h2>
      <code-block :code="loadingPartCode">
        <loading-part />
      </code-block>
    </section>
    <section>
      <h2>SplitButton</h2>
      <code-block :code="splitPartCode">
        <split-part />
      </code-block>
    </section>
    <section>
      <h2>ButtonGroup</h2>
      <code-block :code="buttonGroupPartCode">
        <button-group-part />
      </code-block>
    </section>
    <section>
      <h2>ToggleButton</h2>
      <code-block :code="togglePartCode">
        <toggle-part />
      </code-block>
    </section>
    <section>
      <h2>ToggleButtonGroup</h2>
      <code-block :code="toggleGroupPartCode">
        <toggle-group-part />
      </code-block>
    </section>
    <section>
      <h2>UploadButton</h2>
      <code-block :code="uploadPartCode">
        <upload-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import BasicPart from './parts/BasicPart.vue';
import basicPartCode from './parts/BasicPart.vue?raw';
import ColorPart from './parts/ColorPart.vue';
import colorPartCode from './parts/ColorPart.vue?raw';
import VariantPart from './parts/VariantPart.vue';
import variantPartCode from './parts/VariantPart.vue?raw';
import SizePart from './parts/SizePart.vue';
import sizePartCode from './parts/SizePart.vue?raw';
import IconPart from './parts/IconPart.vue';
import iconPartCode from './parts/IconPart.vue?raw';
import LoadingPart from './parts/LoadingPart.vue';
import loadingPartCode from './parts/LoadingPart.vue?raw';
import SplitPart from './parts/SplitPart.vue';
import splitPartCode from './parts/SplitPart.vue?raw';
import ButtonGroupPart from './parts/ButtonGroupPart.vue';
import buttonGroupPartCode from './parts/ButtonGroupPart.vue?raw';
import TogglePart from './parts/TogglePart.vue';
import togglePartCode from './parts/TogglePart.vue?raw';
import ToggleGroupPart from './parts/ToggleGroupPart.vue';
import toggleGroupPartCode from './parts/ToggleGroupPart.vue?raw';
import UploadPart from './parts/UploadPart.vue';
import uploadPartCode from './parts/UploadPart.vue?raw';
</script>

<style scoped>
:deep(.j-button) {
  margin: 0.2rem;
}
</style>