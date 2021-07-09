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

<script>
// glob load all components
const modules = import.meta.globEager('./parts/*.vue')
const parts = Object.fromEntries(Object.entries(modules).map(([path, module]) => {
  let match = /\/parts\/(.*).vue$/.exec(path);
  if (!match) return null;
  return [match[1], module.default];
}).filter(item => Boolean(item)));


// Sadly glob import in vite does not support raw syntax
import basicPartCode from './parts/BasicPart.vue?raw';
import colorPartCode from './parts/ColorPart.vue?raw';
import variantPartCode from './parts/VariantPart.vue?raw';
import sizePartCode from './parts/SizePart.vue?raw';
import iconPartCode from './parts/IconPart.vue?raw';
import loadingPartCode from './parts/LoadingPart.vue?raw';
import splitPartCode from './parts/SplitPart.vue?raw';
import buttonGroupPartCode from './parts/ButtonGroupPart.vue?raw';
import togglePartCode from './parts/TogglePart.vue?raw';
import toggleGroupPartCode from './parts/ToggleGroupPart.vue?raw';
import uploadPartCode from './parts/UploadPart.vue?raw';

export default {
  setup() {
    return {
      basicPartCode,
      colorPartCode,
      variantPartCode,
      sizePartCode,
      iconPartCode,
      loadingPartCode,
      splitPartCode,
      buttonGroupPartCode,
      togglePartCode,
      toggleGroupPartCode,
      uploadPartCode,
    };
  },
  components: {
    ...parts,
  },
};
</script>

<style scoped>
:deep(.j-button) {
  margin: 0.2rem;
}
</style>