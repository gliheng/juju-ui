<template>
  <example-list
    title="Table"
    :list="list"
    :modules="modules"
  >
    <template v-slot:footer="{ part }">
      <p v-if="part == 'FixedColumnPart.vue'">
        Fixed column table needs fixed-header
      </p>
      <p v-if="part == 'RowGroupingPart.vue'">
        Grouping allows arbitrary grouping of data
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
    title: 'Basic table',
    part: 'BasicPart.vue',
  },
  {
    title: 'Bordered table',
    part: 'BorderedPart.vue',
  },
  {
    title: 'Selectable rows',
    part: 'SelectablePart.vue',
  },
  {
    title: 'Fixed header',
    part: 'FixedHeaderPart.vue',
  },
  {
    title: 'Virtual scroll',
    part: 'VirtualScrollPart.vue',
  },
  {
    title: 'Fixed columns',
    part: 'FixedColumnPart.vue',
  },
  {
    title: 'Row Grouping',
    part: 'RowGroupingPart.vue',
  },
  {
    title: 'Column Grouping',
    part: 'ColGroupingPart.vue',
  },
  {
    title: 'Resizable',
    part: 'ResizablePart.vue',
  },
  {
    title: 'Sortable',
    part: 'SortablePart.vue',
  },
];
</script>
