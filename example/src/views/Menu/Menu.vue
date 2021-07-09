<template>
  <div>
    <h1>Menu</h1>
    <section>
      <h2>Menu</h2>
      <code-block :code="menuPartCode">
        <menu-part />
      </code-block>
    </section>
    <section>
      <h2>Menu with icon</h2>
      <code-block :code="iconPartCode">
        <icon-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import MenuPart from './parts/MenuPart.vue';
import menuPartCode from './parts/MenuPart.vue?raw';
import IconPart from './parts/IconPart.vue';
import iconPartCode from './parts/IconPart.vue?raw';

export default {
  setup() {
    return {
      menuPartCode, iconPartCode,
    };
  },
  components: {
    MenuPart, IconPart,
  },
}
</script>
