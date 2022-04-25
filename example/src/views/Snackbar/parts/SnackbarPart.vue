<template>
  <j-space>
    <j-button @click="showSnackbar">
      Show snackbar
    </j-button>
    <j-button @click="showSnackbarWithButton">
      Show snackbar with button
    </j-button>
    <j-button @click="showSnackbarWithType">
      Show snackbar with type
    </j-button>
    <j-button @click="showSnackbarWithIcon">
      Show snackbar with icon
    </j-button>
  </j-space>
</template>

<script setup>
import { popup } from 'juju-ui';

function showSnackbar() {
  popup.showSnackbar('hello world');
}

function showSnackbarWithButton() {
  popup.showSnackbar('hello world', {
    timeout: 0,
  });
}

function showSnackbarWithType() {
  popup.showSnackbar('hello world', {
    theme: 'info',
  });
}

function showSnackbarWithIcon() {
  popup.showSnackbar('Battery critical!', {
    theme: 'danger',
    icon: 'battery-half-outline',
  });
}
</script>
