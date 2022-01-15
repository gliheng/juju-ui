<template>
  <j-table
    :data="data"
    :columns="columns"
  />
</template>

<script>
import { data } from './TableData';

const columns = [{
  label: 'Name',
  field: 'name',
}, {
  label: 'Age',
  field: 'age',
}, {
  label: 'Gender',
  field: 'gender',
}, {
  label: 'Work',
  field: 'work',
}, {
  label: 'Email',
  field: 'email',
}, {
  label: 'Phone',
  field: 'phone',
}, {
  label: 'Address',
  field: 'address',
}];

export default {
  setup() {
    return { columns, data };
  },
}
</script>
