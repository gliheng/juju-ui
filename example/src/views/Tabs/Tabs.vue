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
import iconPartCode from './parts/IconPart.vue?raw';
import cardPartCode from './parts/CardPart.vue?raw';
import managedPartCode from './parts/ManagedPart.vue?raw';

export default {
  setup() {
    return {
      basicPartCode, iconPartCode,
      cardPartCode, managedPartCode,
    };
  },
  components: {
    ...parts,
  },
};
</script>