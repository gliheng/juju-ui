<template>
  <j-form
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit.prevent="onSubmit"
    @reset.prevent="onReset"
  >
    <j-form-item label="Name" field="name">
      <j-input v-model="form.name" />
    </j-form-item>
    <j-form-item label="Age" field="age">
      <j-number-input v-model="form.age" />
    </j-form-item>
    <j-form-item label="Hobby" field="hobby">
      <j-select v-model="form.hobby" :options="hobbyOptions" />
    </j-form-item>
    <j-form-item label="Introduction" field="intro">
      <j-textarea v-model="form.intro" />
    </j-form-item>
    <j-form-item label="Gender" field="gender">
      <j-radio-group v-model="form.gender" :options="genderOptions" />
    </j-form-item>
    <j-space class="btns">
      <j-button type="submit">Submit</j-button>
      <j-button type="reset">Reset</j-button>
    </j-space>
  </j-form>
</template>

<script setup>
import { ref } from 'vue';

let formRef = ref();
let form = ref({
  name: 'Bill',
  age: 24,
  hobby: 'music',
  intro: 'My name is bill',
  gender: 'male',
});

let rules = {
  name: {
    type: 'string',
    required: true,
  },
  age: {
    type: 'number',
    required: true,
    min: 0,
    max: 100,
  },
  hobby: {
    type: 'string',
    required: true,
  },
  intro: {
    type: 'string',
    required: true,
  },
  gender: {
    type: 'string',
    required: true,
  },
};
const hobbyOptions = [
  {label: 'Tech', value: 'tech'},
  {label: 'Travel', value: 'travel'},
  {label: 'Music', value: 'music'},
];

const genderOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Shemale', value: 'shemale'},
];

async function onSubmit() {
  let values = await formRef.value.validate();
  console.log("Submitted values", values);
}

function onReset() {
  form.value = {};
}

</script>

<style lang="scss" scoped>
.btns {
  margin-top: 10px;
}
</style>
