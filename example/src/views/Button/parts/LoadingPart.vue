<template>
  <j-button class="j-primary" :loading="loading" icon="at-outline" @click="doSave">Save</j-button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let loading = ref(false);
    function doSave() {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 6000);
    }
    return { loading, doSave };
  },
};
</script>

<style lang="scss">

</style>