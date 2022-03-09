<template>
  <div>
    <h1>Tabs</h1>
    <section>
      <h2>Basic tabs</h2>
      <code-block :code="basicPartCode">
        <basic-part />
      </code-block>
    </section>

    <section>
      <h2>Icon side</h2>
      <code-block :code="iconPartCode">
        <icon-part />
      </code-block>
    </section>

    <section>
      <h2>Tabs with icon and card type</h2>
      <code-block :code="cardPartCode">
        <card-part />
      </code-block>
    </section>
    
    <section>
      <h2>Managed tabs</h2>
      <code-block :code="managedPartCode">
        <managed-part />
      </code-block>
    </section>
  </div>
</template>

<script setup>
import BasicPart from './parts/BasicPart.vue';
import basicPartCode from './parts/BasicPart.vue?raw';
import IconPart from './parts/IconPart.vue';
import iconPartCode from './parts/IconPart.vue?raw';
import CardPart from './parts/CardPart.vue';
import cardPartCode from './parts/CardPart.vue?raw';
import ManagedPart from './parts/ManagedPart.vue';
import managedPartCode from './parts/ManagedPart.vue?raw';
</script>