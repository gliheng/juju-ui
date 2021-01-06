<template>
  <div>
    <h1>ColorWheel</h1>
    <div>
      <p>Current color: <i class="box" :style="{'background-color': color}"></i> {{ color }}</p>
      <j-color-wheel v-model="color" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let color = ref('rgb(255, 0, 255)');
    return { color };
  }, 
}
</script>

<style scoped>
.box {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 3px;
}
</style>