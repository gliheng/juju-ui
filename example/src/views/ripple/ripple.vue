<template>
  <example-list
    title="ripple directive"
    :list="list"
    :modules="modules"
  >
    <template v-slot:footer="{ part }">
      <p v-if="part == 'RipplePart.vue'">
        Make sure the container has style
        <code>
          position: relative; overflow: hidden;
        </code>
      </p>
    </template>
  </example-list>
</template>

<script setup>
const modules = {
  components: import.meta.globEager('./parts/*.vue'),
  code: import.meta.globEager('./parts/*.vue', {as: 'raw'}),
};
const list = [
  {
    part: 'RipplePart.vue',
  },
];
</script>
