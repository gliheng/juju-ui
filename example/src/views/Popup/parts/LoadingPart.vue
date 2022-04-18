<template>
  <j-button @click="togglePopup">Open popup</j-button>

  <j-popup
    title="Popup with form"
    :width="300"
    :height="200"
    v-model="popupOpen"
    :loading="loading"
    @accept="accept"
    @dismiss="togglePopup"
  >
    <j-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <j-form-item label="Name" field="name">
        <j-input v-model="form.name" />
      </j-form-item> 
    </j-form>
  </j-popup>
  </template>


<script setup>
import { ref } from 'vue';
import { hooks } from 'juju-ui';

const form = ref({});
const formRef = ref();
const [popupOpen, togglePopup] = hooks.useSwitch();
const loading = ref(false);
const rules = {
  name: {
    type: 'string',
    required: true,
  },
};

async function accept() {
  await formRef.value.validate();
  loading.value = true;
}
</script>
