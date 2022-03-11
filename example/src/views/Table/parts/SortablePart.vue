<template>
  <j-table
    sortable
    bordered
    :data="data"
    :columns="columns"
    v-model:sort="sort"
  />
</template>

<script setup>
import { ref } from 'vue';
import { data } from './TableData';

function sorter(a, b) {
  if (a == b) return 0;
  if (a < b) return -1;
  return 1;
}

const columns = [{
  label: 'Name',
  field: 'name',
  sorter: sorter,
}, {
  label: 'Age',
  field: 'age',
  sorter: sorter,
}, {
  label: 'Gender',
  field: 'gender',
  sorter: sorter,
}, {
  label: 'Work',
  field: 'work',
  sorter: sorter,
}, {
  label: 'Email',
  field: 'email',
  sorter: sorter,
}, {
  label: 'Phone',
  field: 'phone',
  sorter: sorter,
}, {
  label: 'Address',
  field: 'address',
  sorter: sorter,
}];
let sort = ref();
</script>
