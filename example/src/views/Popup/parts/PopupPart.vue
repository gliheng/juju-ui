<template>
  <j-space>
    <j-button @click="toggleAlert">Open alert</j-button>
    <j-button @click="toggleConfirm">Open confirm</j-button>
    <j-button @click="toggleModal">Open modal</j-button>
  </j-space>

  <j-popup
    title="Alert popup"
    :width="300"
    :height="200"
    v-model="alertOpen"
    @dismiss="toggleAlert"
    @accept="toggleAlert"
  >
    <p>Hello, what's your name?</p>
  </j-popup>
  
  <j-popup
    title="Confirm popup"
    type="confirm"
    v-model="confirmOpen"
    @dismiss="toggleConfirm"
    @accept="toggleConfirm"
  >
    <p>Hello, what's your name?</p>
  </j-popup>

  <j-popup
    title="Modal popup"
    :modal="true"
    type="confirm"
    v-model="modalOpen"
    @dismiss="toggleModal"
    @accept="toggleModal"
  >
    <p>Hello, what's your name?</p>
  </j-popup>
</template>


<script setup>
import { hooks } from 'juju-ui';

let [alertOpen, toggleAlert] = hooks.useSwitch();
let [confirmOpen, toggleConfirm] = hooks.useSwitch();
let [modalOpen, toggleModal] = hooks.useSwitch();
</script>
