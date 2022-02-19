<template>
  <div>
    <h1>loading directive</h1>
    <code-block :code="loadingPartCode">
      <loading-part />
    </code-block>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LoadingPart from './parts/LoadingPart.vue';
import loadingPartCode from './parts/LoadingPart.vue?raw';

export default defineComponent({
  setup() {
    return {
      loadingPartCode,
    };
  },
  components: {
    LoadingPart,
  },
});
</script>