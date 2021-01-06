<template>
  <div>
    <h1>Checkbox</h1>
    <section>
      <h2>Checkbox group</h2>
      <p>Which fruit do you like?</p>
      <p>
        <j-checkbox name="fruit" value="apple" v-model="grp">Apple</j-checkbox>
        <j-checkbox name="fruit" value="banana" v-model="grp">Banana</j-checkbox>
        <j-checkbox name="fruit" value="orange" v-model="grp">Orange</j-checkbox>
        <j-checkbox name="fruit" value="melon" v-model="grp">Melon</j-checkbox>
      </p>
      <p>Checked: {{ grp }}</p>
    </section>
    <section>
      <h2>Boolean checkbox</h2>
      <p>Do you like apple?</p>
      <p>
        <j-checkbox v-model="checked">{{ checked ? 'Yes' : 'No' }}</j-checkbox>
      </p>
    </section>
    <section>
      <h2>Tri state checkbox</h2>
      <p>Do you like banana?</p>
      <p>
        <j-checkbox toggle-indeterminate v-model="triChecked">{{ triChecked === null ? 'Not sure' : triChecked ? 'Yes' : 'No' }}</j-checkbox>
      </p>
    </section>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    let grp = reactive(['apple']);
    let checked = ref(false);
    let triChecked = ref(false);
    return { grp, checked, triChecked };
  }
}
</script>

<style scoped>
:deep(.j-checkbox) {
  margin-right: 10px;
}
</style>