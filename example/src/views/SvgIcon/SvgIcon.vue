<template>
  <div>
    <h1>SvgIcon</h1>
    <section>
      <h2>Built-in Icons</h2>
      <div>
        <code-block :code="sizePartCode">
          <size-part />
        </code-block>
        Icons are provided by <a href="https://ionicons.com/" target="_blank">ionicons</a>
      </div>
    </section>
    <section>
      <h2>Using alt props to provide hover icon</h2>
      <code-block :code="altPartCode">
        <alt-part />
      </code-block>
    </section>
    <section>
      <h2>Custom Icons using svg prop</h2>
      <code-block :code="rawPartCode">
        <raw-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import SizePart from './parts/SizePart.vue';
import sizePartCode from './parts/SizePart.vue?raw';
import AltPart from './parts/AltPart.vue';
import altPartCode from './parts/AltPart.vue?raw';
import RawPart from './parts/RawPart.vue';
import rawPartCode from './parts/RawPart.vue?raw';
</script>


<style scoped>
section :deep(.demo) {
  color: rgb(238, 23, 123);
}
</style>