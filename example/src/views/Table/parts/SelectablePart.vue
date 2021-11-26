<template>
  <j-table
    :data="data"
    :columns="columns"
    selectable
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
