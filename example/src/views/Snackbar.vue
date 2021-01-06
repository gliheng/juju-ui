<template>
  <div>
    <h1>Snackbar</h1>
    <div>
      <j-button @click="showSnackbar">Show snackbar</j-button>
    </div>
  </div>
</template>

<script>
import { utils } from 'juju-ui';

export default {
  methods: {
    showSnackbar() {
      utils.popup.showSnackbar('hello world');
    }
  }
}
</script>