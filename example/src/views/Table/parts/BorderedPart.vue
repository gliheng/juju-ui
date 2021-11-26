<template>
  <j-table
    bordered
    :data="data"
    :columns="columns"
  />
</template>
<script>
import { columns, data } from './TableColumns.tsx';

export default {
  setup() {
    return { columns, data };
  },
}
</script>