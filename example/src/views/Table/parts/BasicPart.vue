<template>
  <j-table :data="data" :columns="columns" />
</template>

<script>
import { data, columns } from './TableColumns.tsx';

export default {
  setup() {
    return { columns, data };
  },
}
</script>
