<template>
  <div>
    <h1>Input</h1>
    <section>
      <j-input placeholder="Username" v-model="v" />
      <p>Current value: {{ v }}</p>
    </section>
    <section>
      <h2>Disabled</h2>
      <j-input placeholder="Username" v-model="v" disabled />
    </section>
    <section>
      <h2>Prepend and append icons</h2>
      <j-input placeholder="Username" v-model="v">
        <template #prepend>
          <j-svg-icon name="alarm" />
        </template>
        <template #append>
          <j-svg-icon name="arrow-forward" />
        </template>
      </j-input>
    </section>
    <section>
      <h2>Clearable input</h2>
      <j-input placeholder="Username" v-model="v" clearable>
        <template #prepend>
          <j-svg-icon name="search" />
        </template>
      </j-input>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let v = ref('');
    return { v };
  }  
}
</script>