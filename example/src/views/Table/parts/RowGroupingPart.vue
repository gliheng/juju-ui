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

<script>
import { fixedColumnColumns, data } from './TableColumns';

const grouping = ['gender', 'favoriteFood'];

export default {
  setup() {
    return { fixedColumnColumns, data, grouping };
  },
}
</script>