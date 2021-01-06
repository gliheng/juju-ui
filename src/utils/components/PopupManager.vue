<template>
  <div class="j-popup-manager">
    <j-popup v-for="(popup, id) in popups" :key="id"
      v-model="popup.visible" @dismiss="popup.dismiss.call(popup, $event)" @accept="popup.accept.call(popup)"
      :type="popup.type" :title="popup.title || ''"
      :width="popup.width || 300" :height="popup.height || 220" :modal="popup.modal">
      <svg-icon v-if="popup.icon" :class="[ 'j-popup-icon', popup.iconColor || 'j-danger' ]" :name="popup.icon" size="lg" />
      <p class="j-popup-content">{{ popup.msg || '' }}</p>
    </j-popup>
  </div>
</template>

<script lang="ts">
import { ref, reactive, nextTick, Ref } from 'vue';
import JPopup from '../../components/Popup.vue';
import SvgIcon from '../../components/SvgIcon.vue';

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

export default {
  setup() {
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
          },
          dismiss() {
            this.visible = false;
            reject();
          }
        });
        // Push then modify it allows the popup to animate in
        popups.push(popup);
        nextTick(() => {
          popup.visible = true;
        });
      });
    }
  
    function showAlert(msg: string, opts: PopupOpts): Promise<void> {
      return showPopupOfType('alert', msg, opts);
    }

    function showConfirm(msg: string, opts: PopupOpts): Promise<void> {
      return showPopupOfType('confirm', msg, opts);
    }

    return {
      popups, showAlert, showConfirm,
    };
  },
  components: { JPopup, SvgIcon },
}
</script>

<style lang="scss">
.j-popup-manager {
  .j-popup {
    main {
      display: flex;
      align-items: center;
      > .j-popup-icon {
        margin-right: 0.5rem;
        color: var(--primary-color);
      }
      > .j-popup-content {
        margin: 0;
      }
    }
  }
}
</style>