<template>
  <j-reorder-list-group class="list-group">
    <div class="list">
      <h1>TODO</h1>
      <j-reorder-list v-model="todo" :on-remove="onRemove" />
    </div>
    <div class="list">
      <h1>DOING</h1>
      <j-reorder-list v-model="doing" :on-remove="onRemove" />
    </div>
    <div class="list">
      <h1>DONE</h1>
      <j-reorder-list v-model="done" :on-remove="onRemove" />
    </div>
  </j-reorder-list-group>
</template>

<script setup>
const todo = [
  { label: 'Eat' },
  { label: 'Sleep' },
  { label: 'Drink' },
  { label: 'Coffee' },
  { label: 'Lunch' },
  { label: 'Breath' },
  { label: 'Relax' },
];
const doing = [];
const done = [];
function onRemove(item) {
  // Return true to prevent the dragged item from being removed
  return false;
}
</script>

<style scoped>
.list-group {
  display: flex;
}
.list {
  margin: 0 4px;
  width: 200px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--j-foreground-color-2);
}
.list:deep(h1) {
  font-size: 20px;
  padding: 0 10px;
}
.list:deep(ul) {
  flex: 1;
}
</style>
