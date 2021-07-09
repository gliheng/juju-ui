<template>
  <div>
    <h1>Textarea</h1>
    <section>
      <code-block :code="textareaPartCode">
        <textarea-part />
      </code-block>
    </section>
  </div>
</template>

<script>
import TextareaPart from './parts/TextareaPart.vue';
import textareaPartCode from './parts/TextareaPart.vue?raw';

export default {
  setup() {
    return { textareaPartCode };
  },
  components: {
    TextareaPart,
  },
}
</script>