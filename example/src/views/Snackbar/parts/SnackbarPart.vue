<template>
  <j-button @click="showSnackbar">Show snackbar</j-button>
</template>

<script>
import { popup } from 'juju-ui';

export default {
  methods: {
    showSnackbar() {
      popup.showSnackbar('hello world');
    }
  }
}
</script>