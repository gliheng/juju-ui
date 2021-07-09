<template>
  <j-data-table :data="data" :columns="fixedColumnColumns" :height="200" />
</template>

<script>
import { data, fixedColumnColumns } from './TableColumns.tsx';

export default {
  setup() {
    return { data, fixedColumnColumns };
  },
}
</script>