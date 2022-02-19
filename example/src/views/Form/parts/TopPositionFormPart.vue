<template>
  <j-form
    label-position="top"
    :model="form"
  >
    <j-form-item label="Name" field="name">
      <j-input v-model="form.name" />
    </j-form-item>
    <j-form-item label="Age" field="age">
      <j-number-input v-model="form.age" />
    </j-form-item>
  </j-form>
</template>

<script setup>
import { ref } from 'vue';

let form = ref({});
</script>
