<template>
  <j-auto-complete
    placeholder="Please input your search"
    :options="options"
    :query="query"
  >
    <template #prepend>
      <j-icon name="search" />
    </template>
  </j-auto-complete>
</template>

<script setup>
const options = ['Food', 'Drinks'];

function query(k) {
  let arr = [];
  for (let i = 1; i <= 20; i++) {
    let s = k.repeat(i);
    arr.push(s);
  }
  return arr;
}
</script>
