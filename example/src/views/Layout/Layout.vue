<template>
  <div>
    <h1>Layout</h1>
    <div>
      <section>
        <h2>Space</h2>
        <code-block :code="spacePartCode">
          <space-part />
        </code-block>
      </section>
    </div>
  </div>
</template>

<script setup>
import SpacePart from './parts/SpacePart.vue';
import spacePartCode from './parts/SpacePart.vue?raw';
</script>

<style lang="scss">

</style>
