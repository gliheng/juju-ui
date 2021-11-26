<template>
  <div>
    <h1>Form</h1>
    <section>
      <j-form layout="vertical" v-model="form" @submit.prevent="onSubmit">
        <j-form-item label="Name" field="name" :rules="nameRules">
          <j-input />
        </j-form-item>
        <j-form-item label="Age" field="age" :rules="ageRules">
          <j-number-input />
        </j-form-item>
        <div>
          <j-button type="submit">Submit</j-button>
          <j-button @click="onReset">Reset</j-button>
        </div>
      </j-form>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    let formRef = ref();
    let form = reactive({
      name: 'Bill',
      age: 24,
    });

    let nameRules = [];
    let ageRules = [];

    return {
      form,
      async onSubmit() {
        let values = await formRef.current.validate();
        console.log("Submitted values", values);
      },
      onReset() {
        formRef.current.resetFields();
      },
      nameRules,
      ageRules,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>