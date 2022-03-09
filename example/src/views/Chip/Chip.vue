<template>
  <div>
    <h1>Chip</h1>
    <div>
      <section>
        <h2>Text chip</h2>
        <code-block :code="textPartCode">
          <text-part />
        </code-block>
      </section>
      <section>
        <h2>Chip with icon</h2>
        <code-block :code="iconPartCode">
          <icon-part />
        </code-block>
      </section>
      <section>
        <h2>Chip with close icon</h2>
        <code-block :code="closablePartCode">
          <closable-part />
        </code-block>
      </section>
    </div>
  </div>
</template>

<script setup>
import TextPart from './parts/TextPart.vue';
import textPartCode from './parts/TextPart.vue?raw';
import IconPart from './parts/IconPart.vue';
import iconPartCode from './parts/IconPart.vue?raw';
import ClosablePart from './parts/ClosablePart.vue';
import closablePartCode from './parts/ClosablePart.vue?raw';
</script>

<style scoped>
section :deep(.j-chip) {
  margin: 0 0.2rem;
}
</style>