<template>
  <j-table
    fixed-header
    :data="data"
    :columns="fixedHeaderColumns"
    :height="200"
  />
</template>

<script setup>
import { data } from './TableData';

const fixedHeaderColumns = [{
  label: 'Name',
  field: 'name',
  width: 100,
}, {
  label: 'Age',
  field: 'age',
  width: 100,
}, {
  label: 'Gender',
  field: 'gender',
  width: 100,
}, {
  label: 'Work',
  field: 'work',
  width: 150,
}, {
  label: 'Email',
  field: 'email',
  width: 150,
}, {
  label: 'Phone',
  field: 'phone',
  width: 100,
}, {
  label: 'Address',
  field: 'address',
  width: 260,
}, {
  label: 'Favorite Food',
  field: 'favoriteFood',
  width: 140,
}, {
  label: 'Favorite Sport',
  field: 'favoriteSport',
  width: 140,
}];
</script>
