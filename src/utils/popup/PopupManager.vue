<template>
  <j-popup v-for="(popup, id) in popups"
    v-model="popup.visible"
    :key="id"
    :type="popup.type" :title="popup.title || ''"
    :width="popup.width || 300"
    :height="popup.height || 220"
    :modal="popup.modal"
    @dismiss="popup.dismiss.call(popup, $event)"
    @accept="popup.accept.call(popup)"
  >
    <j-icon v-if="popup.icon" :class="[ 'j-popup-icon', popup.iconColor || 'j-danger' ]" :name="popup.icon" size="lg" />
    <p class="j-popup-content">{{ popup.msg || '' }}</p>
  </j-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, nextTick, Ref } from 'vue';
import JPopup from '@/Popup/Popup.vue';
import JIcon from '@/Icon/Icon.vue';

export interface PopupOpts {
  title?: string,
  modal?: boolean,
  width?: number,
  height?: number,
  icon?: string,
  iconColor?: string,
}

export type PopupType = {
  msg: string,
  type: string,
  visible: Ref<boolean>,
  accept: () => void,
  dismiss: (action: string) => void,
} & PopupOpts;

export default defineComponent({
  setup(_, { expose }) {
    let popups = reactive<Array<PopupType>>([]);

    function showPopupOfType(type: string, msg: string, opts: PopupOpts): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        let popup = reactive({
          msg,
          type,
          ...opts,
          visible: false,
          accept() {
            this.visible = false;
            resolve();
            remove(popup);
          },
          dismiss() {
            this.visible = false;
            reject();
            remove(popup);
          }
        });
        // Push then modify it allows the popup to animate in
        popups.push(popup);
        nextTick(() => {
          popup.visible = true;
        });
      });
    }

    function remove(popup) {
      let idx = popups.indexOf(popup);
      if (idx != -1) {
        popups.splice(idx, 1);
      }
    }
  
    expose({
      showAlert(msg: string, opts: PopupOpts): Promise<void> {
        return showPopupOfType('alert', msg, opts);
      },
      showConfirm(msg: string, opts: PopupOpts): Promise<void> {
        return showPopupOfType('confirm', msg, opts);
      },
    });

    return {
      popups,
    };
  },
  components: { JPopup, JIcon },
});
</script>
