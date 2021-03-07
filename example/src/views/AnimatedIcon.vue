<template>
  <div>
    <h1>AnimatedIcon</h1>
    <section>
      <h2>Menu Opener</h2>
      <div>
        <j-animated-icon:menu-opener v-model="on" />
      </div>
    </section>
    <section>
      <h2>Menu Toggle</h2>
      <div>
        <j-animated-icon:menu-toggle v-model="on1" />
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let on = ref(false);
    let on1 = ref(false);

    return {
      on, on1,
    };
  }
}
</script>

<style>

</style>