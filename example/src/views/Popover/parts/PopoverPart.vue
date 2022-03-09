<template>
  <main>
    <j-popover :side="side" :trigger="trigger">
      <j-button>Show popover</j-button>
      <template #popover="{ toggle }">
        <div class="confirm">
          <p>
            Could you bring me a cup of coffee please?
          </p>
          <j-button @click="toggle">OK</j-button>
        </div>
      </template>
    </j-popover>
  </main>
</template>

<script setup>
import { ref } from 'vue';

let side = ref('bottom');
let trigger = ref('click');
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
.confirm {
  width: 350px;
}
</style>