<template>
  <div>
    <h1>Table</h1>
    <section class="tabs">
      <h2>Basic tabs</h2>
      <div>
        <j-table :data="data" :columns="columns" />
      </div>
    </section>
    <section class="tabs">
      <h2>Selectable rows</h2>
      <div>
        <j-table :data="data" :columns="columns" selectable />
      </div>
    </section>
    <section class="tabs">
      <h2>Fixed header</h2>
      <div>
        <j-table :data="data" :columns="fixedHeaderColumns" :height="200" />
      </div>
    </section>
    <section class="tabs">
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
      }, {
        name: 'Joe',
        age: 20,
        gender: 'female',
        work: 'Violinist',
        phone: '123456',
        address: 'New York No. 1 lake park',
      }, {
        name: 'Tom',
        age: 25,
        gender: 'male',
        work: 'Singer',
        phone: '123456',
        address: 'New York No. 1 lake park',
      }, {
        name: 'Jim',
        age: 21,
        gender: 'male',
        work: 'Programmer',
        phone: '123456',
        address: 'New York No. 1 lake park',
      }, {
        name: 'Sam',
        age: 12,
        gender: 'male',
        work: 'Dancer',
        phone: '123456',
        address: 'New York No. 1 lake park',
      }]
    }
  },
}
</script>