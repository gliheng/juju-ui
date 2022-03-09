<template>
  <j-table
    bordered
    fixed-header
    resizable
    storage-key="juju-resizable-table"
    :data="data"
    :columns="columns"
  />
</template>

<script setup>
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
</script>
