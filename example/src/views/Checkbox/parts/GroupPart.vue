<template>
  <p>Which fruit do you like?</p>
  <p>
    <j-checkbox name="fruit" value="apple" v-model="grp">Apple</j-checkbox>
    <j-checkbox name="fruit" value="banana" v-model="grp">Banana</j-checkbox>
    <j-checkbox name="fruit" value="orange" v-model="grp">Orange</j-checkbox>
    <j-checkbox name="fruit" value="melon" v-model="grp">Melon</j-checkbox>
  </p>
  <p>Checked: {{ grp }}</p>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    let grp = reactive(['apple']);
    return { grp };
  },
};
</script>
