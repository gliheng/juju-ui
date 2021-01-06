<template>
  <div>
    <h1>Popup</h1>
    <section>
      <h2>Single instance popups</h2>
      <div>
        <j-button @click="toggleAlert">Open alert</j-button>
        <j-button @click="toggleConfirm">Open confirm</j-button>
        <j-button @click="toggleModal">Open modal</j-button>
      </div>
    </section>
    <section>
      <h2>One-off popups</h2>
      <div>
        <j-button @click="showAlert">Open alert</j-button>
        <j-button @click="showConfirm">Open confirm</j-button>
        <j-button @click="showModal">Open modal</j-button>
      </div>
    </section>
    <j-popup title="Alert popup" :width="300" :height="200"
      v-model="alertOpen" @dismiss="toggleAlert" @accept="toggleAlert">
      <p>Hello, what's your name?</p>
    </j-popup>
    
    <j-popup title="Confirm popup" type="confirm"
      v-model="confirmOpen" @dismiss="toggleConfirm" @accept="toggleConfirm">
      <p>Hello, what's your name?</p>
    </j-popup>

    <j-popup title="Modal popup" :modal="true" type="confirm"
      v-model="modalOpen" @dismiss="toggleModal" @accept="toggleModal">
      <p>Hello, what's your name?</p>
    </j-popup>
  </div>
</template>

<script>
import { utils } from 'juju-ui';

export default {
  setup() {
    let [alertOpen, toggleAlert] = utils.vue.useSwitch();
    let [confirmOpen, toggleConfirm] = utils.vue.useSwitch();
    let [modalOpen, toggleModal] = utils.vue.useSwitch();

    async function showAlert() {
      let ret = await utils.popup.alert("Shall we have dinner tonight?", {
        title: 'Invitation',
        icon: 'alert-circle',
        iconColor: 'j-success',
      });
      utils.popup.alert('How nice that you accepted!', {
        width: 240,
        height: 150,
      });
    }

    async function showConfirm() {
      let ret = await utils.popup.confirm("Shall we have dinner tonight?");
      utils.popup.alert('How nice that you accepted!');
    }

    async function showModal() {
      let ret = await utils.popup.confirm("Shall we have dinner tonight?", {
        icon: 'alert',
        modal: true,
      });
      utils.popup.alert('How nice that you accepted!', {
        modal: true,
      });
    }
    
    return {
      alertOpen, confirmOpen, modalOpen,
      toggleAlert, toggleConfirm, toggleModal,
      showAlert, showConfirm, showModal,
    };
  },
}
</script>

<style scoped>
section :deep(.j-button) {
  margin: 0.2rem;
}
</style>