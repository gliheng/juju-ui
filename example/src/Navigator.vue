<template>
  <div>
    <section v-for="(group, groupName) in config" :key="groupName">
      <h3>{{ groupName }}</h3>
      <div class="grid">
        <router-link
          v-for="(c, idx) in group"
          :key="idx"
          :active="route.name == c.name"
          :to="routeMap[c.name].path"
        >
          <div class="box">{{ c.name }}</div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { routeMap, config } from './router';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style lang="scss" scoped>
section {
  h3 {
    color: #999;
    margin-bottom: 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-gap: 1rem;
    margin: 1rem 0;
    .box {
      padding: 1rem;
      text-align: center;
      color: var(--j-text-color);
      background-color: var(--j-background-color-1);
      &:hover {
        background-color: var(--j-primary-color-lighter);
      }
    }
  }
}
</style>