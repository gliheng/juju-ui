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
        <j-table :data="data" :columns="fixedHeaderColumns" :fixed-header="true" :height="200" />
      </div>
    </section>
    <section>
      <h2>Sortable columns</h2>
      <div>
        <!-- <j-table :data="data" :columns="columns" /> -->
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { columns, fixedHeaderColumns } from './TableColumns';

export default {
  setup() {
    return {
      columns,
      fixedHeaderColumns,
      data: [{
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
      }]
    }
  },
}
</script>