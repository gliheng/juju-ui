<template>
  <div>
    <h1>Table</h1>
    <section>
      <h2>Basic table</h2>
      <div>
        <j-table :data="data" :columns="columns" />
      </div>
    </section>
    <section>
      <h2>Bordered table</h2>
      <div>
        <j-table bordered :data="data" :columns="columns" />
      </div>
    </section>
    <section>
      <h2>Selectable rows</h2>
      <div>
        <j-table :data="data" :columns="columns" selectable />
      </div>
    </section>
    <section>
      <h2>Fixed header</h2>
      <div>
        <j-data-table :data="data" :columns="fixedHeaderColumns" :height="200" />
      </div>
    </section>
    <section>
      <h2>Fixed columns</h2>
      <div>
        <j-data-table :data="data" :columns="fixedColumns" :height="200" />
      </div>
      <p>Fixed column table needs fixed-header</p>
    </section>
    <section>
      <h2>Sortable columns</h2>
      <div>
        <!-- <j-table :data="data" :columns="columns" /> -->
      </div>
    </section>
    <section>
      <h2>Row Grouping</h2>
      <div>
        <j-data-table :data="data" :columns="fixedColumns" :grouping="grouping" :height="200">
          <template #gender-renderer="{ groupValue }">
            <span class="gender-row">{{ groupValue }}</span>
          </template>
          <template #favoriteFood-renderer="{ groupValue }">
            <span class="favorite-food-row">{{ groupValue }}</span>
          </template>
        </j-data-table>
      </div>
      <p>Grouping allows arbitrary grouping of data</p>
    </section>
  </div>
</template>

<script lang="ts">
import { columns, fixedHeaderColumns, fixedColumns } from './TableColumns';

export default {
  setup() {
    const data = [{
      name: 'Bill',
      age: 37,
      gender: 'male',
      work: 'Programmer',
      phone: '123456',
      address: 'New York No. 1 lake park',
      favoriteFood: 'Apple',
      favoriteSport: 'Dance',
    }, {
      name: 'Joe',
      age: 20,
      gender: 'female',
      work: 'Violinist',
      phone: '123456',
      address: 'New York No. 1 lake park',
      favoriteFood: 'Banana',
      favoriteSport: 'Fight',
    }, {
      name: 'Tom',
      age: 25,
      gender: 'male',
      work: 'Singer',
      phone: '123456',
      address: 'New York No. 1 lake park',
      favoriteFood: 'Pie',
      favoriteSport: 'Fencing',
    }, {
      name: 'Jim',
      age: 21,
      gender: 'male',
      work: 'Programmer',
      phone: '123456',
      address: 'New York No. 1 lake park',
      favoriteFood: 'Soup',
      favoriteSport: 'Jogging',
    }, {
      name: 'Sam',
      age: 12,
      gender: 'male',
      work: 'Dancer',
      phone: '123456',
      address: 'New York No. 1 lake park',
      favoriteFood: 'Chicken',
      favoriteSport: 'Swimming',
    }];

    const grouping = ['gender', 'favoriteFood'];

    return {
      columns,
      fixedHeaderColumns,
      fixedColumns,
      data,
      grouping,
    }
  },
}
</script>