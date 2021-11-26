<template>
  <j-table
    fixed-header
    :data="data"
    :columns="fixedColumnColumns"
    :height="200"
  />
</template>

<script>
import { data, fixedColumnColumns } from './TableColumns.tsx';

export default {
  setup() {
    return { data, fixedColumnColumns };
  },
}
</script>