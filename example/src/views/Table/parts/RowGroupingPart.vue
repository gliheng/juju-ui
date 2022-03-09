<template>
  <j-table
    fixed-header
    :data="data"
    :columns="fixedColumnColumns"
    :grouping="grouping"
    :height="200"
  >
    <template #gender-renderer="{ groupValue }">
      <span class="gender-row">{{ groupValue }}</span>
    </template>
    <template #favoriteFood-renderer="{ groupValue }">
      <span class="favorite-food-row">{{ groupValue }}</span>
    </template>
  </j-table>
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

const grouping = ['gender', 'favoriteFood'];
</script>
