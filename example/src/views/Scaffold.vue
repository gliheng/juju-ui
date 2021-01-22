<template>
  <j-scaffold :actions="actions">
    <template #title>juju-ui demo</template>
    <template #content>
      <div class="content">
        <p>Scaffold example</p>
      </div>
    </template>
    <template #nav>
      <j-listbox>
        <j-listbox-item v-for="(item, i) in drawerItems" :key="item.label" @click="active = i"
        :icon="item.icon" :active="i == active">{{ item.label }}</j-listbox-item>
      </j-listbox>
    </template>
    <template #nav-title>🍄 JUJU-UI</template>
  </j-scaffold>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let active = ref(0);
    let drawerItems = [{
      icon: 'airplane', label: 'Airplane',
    }, {
      icon: 'car', label: 'Car',
    }, {
      icon: 'bicycle', label: 'Bicycle',
    }, {
      icon: 'bus', label: 'Bus',
    }];

    let actions = [{ 
      icon: 'heart', sticky: true, onClick() {
        console.log('I love it!');
      }
    }, {
      label: 'Happy', icon: 'happy', onClick() {
        console.log('I\'m happy!');
      }
    }, {
      label: 'Sad', icon: 'sad', onClick() {
        console.log('I\'m sad!');
      }
    }];

    return {
      drawerItems, active, actions,
    };
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
}
</style>