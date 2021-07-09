<template>
  <j-auto-complete placeholder="Please input your search" :query="query" />
</template>

<script>
export default {
  setup() {
    return {
      query(k) {
        let arr = [];
        for (let i = 1; i <= 5; i++) {
          let s = k.repeat(i);
          arr.push({ label: s, value: s });
        }
        return arr;
      }
    };
  },
};
</script>
