<template>
  <div>
    <h1>AnimatedIcon</h1>
    <section>
      <h2>Menu Opener</h2>
      <code-block :code="menuOpenerCode">
        <menu-opener />
      </code-block>
    </section>
    <section>
      <h2>Menu Toggle</h2>
      <code-block :code="menuToggleCode">
        <menu-toggle />
      </code-block>
    </section>
  </div>
</template>

<script>
import MenuOpener from './parts/MenuOpener.vue';
import menuOpenerCode from './parts/MenuOpener.vue?raw';
import MenuToggle from './parts/MenuToggle.vue';
import menuToggleCode from './parts/MenuToggle.vue?raw';
export default {
  setup() {
    return {
      menuOpenerCode, menuToggleCode,
    };
  },
  components: {
    MenuOpener, MenuToggle,
  },
};
</script>

<style>

</style>