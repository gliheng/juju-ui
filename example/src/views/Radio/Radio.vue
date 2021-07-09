<template>
  <div>
    <h1>Checkbox</h1>
    <section>
      <code-block :code="radioPartCode">
        <radio-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import RadioPart from './parts/RadioPart.vue';
import radioPartCode from './parts/RadioPart.vue?raw';

export default {
  setup() {
    return { radioPartCode };
  },
  components: { RadioPart },
}
</script>
