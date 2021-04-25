<template>
  <div>
    <h1>ContextMenu</h1>
    <section>
      <j-context-menu class="box">
        <template #menu>
          <j-menu-list class="menu">
            <j-menu label="Windows" icon="logo-windows" @click="onClick('logo-windows')" />
            <j-menu label="Google" icon="logo-google" @click="onClick('logo-google')" />
            <j-menu label="Linux" icon="logo-tux" @click="onClick('logo-tux')" />
            <j-menu label="Slack" icon="logo-slack" @click="onClick('logo-slack')" />
          </j-menu-list>
        </template>
        <div v-if="!sel">Please select an app from context menu</div>
        <j-svg-icon v-else :name="sel" size="lg" />
      </j-context-menu>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let sel = ref('');
    return {
      sel,
      onClick(v) {
        sel.value = v;
      },
    }
  },
}
</script>

<style scoped>
.box {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color-2);
  color: var(--text-color);
}
</style>