<template>
  <div>
    <h1>MenuBar</h1>
    <section>
      <code-block :code="menuBarPartCode">
        <menu-bar-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import MenuBarPart from './parts/MenuBarPart.vue';
import menuBarPartCode from './parts/MenuBarPart.vue?raw';

export default {
  setup() {
    return { menuBarPartCode };
  },
  components: {
    MenuBarPart,
  },
}
</script>