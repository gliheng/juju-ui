<template>
  <j-space>
    <j-button @click="showAlert">Open alert</j-button>
    <j-button @click="showConfirm">Open confirm</j-button>
    <j-button @click="showModal">Open modal</j-button>
  </j-space>
</template>

<script setup>
import { popup } from 'juju-ui';

async function showAlert() {
  let ret = await popup.alert("Shall we have dinner tonight?", {
    title: 'Invitation',
    icon: 'alert-circle',
    iconColor: 'j-success',
  });
  popup.alert('How nice that you accepted!', {
    width: 240,
    height: 200,
  });
}

async function showConfirm() {
  let ret = await popup.confirm("Shall we have dinner tonight?");
  popup.alert('How nice that you accepted!');
}

async function showModal() {
  let ret = await popup.confirm("Shall we have dinner tonight?", {
    icon: 'alert-circle',
    modal: true,
  });
  popup.alert('How nice that you accepted!', {
    modal: true,
  });
}
</script>
