<template>
  <j-data-table :data="data" :columns="fixedHeaderColumns" :height="200" />
</template>

<script>
import { data, fixedHeaderColumns } from './TableColumns.tsx';

export default {
  setup() {
    return { data, fixedHeaderColumns };
  },
}
</script>