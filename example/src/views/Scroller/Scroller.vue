<template>
  <div>
    <h1>scroller</h1>
    <section>
      <h2>Both directions</h2>
      <code-block :code="scollerPartCode">
        <scoller-part />
      </code-block>
    </section>
    <section>
      <h2>Vertical</h2>
      <code-block :code="vertcalPartCode">
        <vertical-part />
      </code-block>
    </section>
    <section>
      <h2>Horizontal</h2>
      <code-block :code="horizontalPartCode">
        <horizontal-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import ScollerPart from './parts/ScrollerPart.vue';
import HorizontalPart from './parts/HorizontalPart.vue';
import VerticalPart from './parts/VerticalPart.vue';
import scollerPartCode from './parts/ScrollerPart.vue?raw';
import horizontalPartCode from './parts/HorizontalPart.vue?raw';
import vertcalPartCode from './parts/VerticalPart.vue?raw';
</script>