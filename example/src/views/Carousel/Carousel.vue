<template>
  <div>
    <h1>Checkbox</h1>
    <section>
      <h2>Carousel</h2>
      <code-block :code="carouselPartCode">
        <carousel-part />
      </code-block>
    </section>
    <section>
      <h2>Vertical carousel</h2>
      <code-block :code="verticalPartCode">
        <vertical-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import CarouselPart from './parts/CarouselPart.vue';
import carouselPartCode from './parts/CarouselPart.vue?raw';
import VerticalPart from './parts/VerticalPart.vue';
import verticalPartCode from './parts/VerticalPart.vue?raw';
</script>
