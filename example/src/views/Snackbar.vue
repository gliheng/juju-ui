<template>
  <div>
    <h1>Snackbar</h1>
    <div>
      <j-button @click="showSnackbar">Show snackbar</j-button>
    </div>
  </div>
</template>

<script>
import { popup } from 'juju-ui/utils';

export default {
  methods: {
    showSnackbar() {
      popup.showSnackbar('hello world');
    }
  }
}
</script>