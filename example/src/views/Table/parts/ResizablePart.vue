<template>
  <j-table
    bordered
    resizable
    fixed-header
    storage-key="juju-resizable-table"
    :data="data"
    :columns="columns"
  />
</template>

<script>
import { data } from './TableData';

const columns = [{
  label: 'Name',
  field: 'name',
  width: 160,
  sticky: 'left',
}, {
  label: 'Age',
  field: 'age',
  width: 160,
  sticky: 'left',
}, {
  label: 'Gender',
  field: 'gender',
  width: 160,
}, {
  label: 'Work',
  field: 'work',
  width: 160,
}, {
  label: 'Email',
  field: 'email',
  width: 300,
}, {
  label: 'Phone',
  field: 'phone',
  width: 160,
}, {
  label: 'Address',
  field: 'address',
  width: 400,
}];

export default {
  setup() {
    return { columns, data };
  },
}
</script>
