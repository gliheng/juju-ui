<template>
  <j-space>
    <j-button @click="showSnackbar">Show snackbar</j-button>
    <j-button @click="showSnackbarWithButton">Show snackbar with button</j-button>
  </j-space>
</template>

<script setup>
import { popup } from 'juju-ui';

function showSnackbar() {
  popup.showSnackbar('hello world');
}

function showSnackbarWithButton() {
  popup.showSnackbar('hello world', 0);
}
</script>
