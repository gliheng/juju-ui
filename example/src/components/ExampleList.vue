<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>
    <section v-for="(e, i) of listWithCode" :key="i">
      <h2 v-if="e.title">{{ e.title }}</h2>
      <code-block :code="e.code">
        <component :is="e.component" />
      </code-block>
      <slot name="footer" :part="e.part"></slot>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  list: Array,
  modules: Object,
});

const listWithCode = computed(() => {
  const { list = [], modules } = props;
  const codeMap = mapKeys(modules.code);
  const componentMap = mapKeys(modules.components);
  return list.map((e => {
    let { title, part } = e;
    return {
      title,
      part,
      code: codeMap[part],
      component: componentMap[part].default,
    };
  }));
});

function mapKeys(obj) {
  let ret = {};
  for (let key in obj) {
    let i = key.lastIndexOf('/');
    ret[key.substring(i+1)] = obj[key];
  }
  return ret;
}
</script>

<style scoped>
</style>
