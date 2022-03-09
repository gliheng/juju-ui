<template>
  <div>
    <h1>Popup</h1>
    <section>
      <h2>Single instance popups</h2>
      <code-block :code="popupPartCode">
        <popup-part />
      </code-block>
    </section>
    <section>
      <h2>One-off popups</h2>
      <code-block :code="oneOffPartCode">
        <one-off-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import PopupPart from './parts/PopupPart.vue'
import popupPartCode from './parts/PopupPart.vue?raw'
import OneOffPart from './parts/OneOffPart.vue'
import oneOffPartCode from './parts/OneOffPart.vue?raw'
</script>

<style scoped>
section :deep(.j-button) {
  margin: 0.2rem;
}
</style>