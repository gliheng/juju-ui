<template>
  <j-table
    fixed-header
    :data="data"
    :columns="fixedColumnColumns"
    :height="200"
  />
</template>

<script setup>
import { data } from './TableData';

const fixedColumnColumns = [{
  label: 'Name',
  field: 'name',
  width: 100,
  sticky: 'left',
}, {
  label: 'Age',
  field: 'age',
  width: 100,
  sticky: 'left',
}, {
  label: 'Gender',
  field: 'gender',
  width: 100,
  sticky: 'left',
}, {
  label: 'Work',
  field: 'work',
  width: 150,
}, {
  label: "Contact Info",
  align: "center",
  children: [
    {
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
    },
  ],
}, {
  label: 'Hobby',
  sticky: 'right',
  align: "center",
  children: [
    {
      label: 'Favorite Food',
      field: 'favoriteFood',
      width: 140,
    }, {
      label: 'Favorite Sport',
      field: 'favoriteSport',
      width: 140,
    }
  ],
}];
</script>
