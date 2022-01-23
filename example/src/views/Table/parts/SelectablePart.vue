<template>
  <j-table
    :data="data"
    :columns="columns"
    selectable
  />
</template>

<script>
import { data } from './TableData.tsx';

const columns = [{
  type: 'selection',
},{
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
