<template>
  <j-popup v-for="(popup, id) in popups"
    v-model="popup.visible"
    :key="id"
    :type="popup.type"
    :title="popup.title || ''"
    :width="popup.width || 300"
    :height="popup.height || 220"
    :modal="popup.modal"
    @dismiss="sendFeedback('dismiss', popup, $event, id)"
    @accept="sendFeedback('accept', popup, $event, id)"
  >
    <template v-if="typeof popup.msg == 'string'">
      <j-icon v-if="popup.icon" :class="[ 'j-popup-icon', popup.iconColor || 'j-danger' ]" :name="popup.icon" size="lg" />
      <p class="j-popup-content">{{ popup.msg || '' }}</p>
    </template>
    <div v-else>
      <Component :ref="(v: any) => componentRefs[id] = v" :is="popup.msg" />
    </div>
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
  accept: (ret: any) => void,
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
          accept(v: any) {
            this.visible = false;
            resolve(v);
            remove(popup);
          },
          dismiss(v: any) {
            this.visible = false;
            reject(v);
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
      showAlert(msg: string | JSX.Element, opts: PopupOpts): Promise<void> {
        return showPopupOfType('alert', msg, opts);
      },
      showConfirm(msg: string | JSX.Element, opts: PopupOpts): Promise<void> {
        return showPopupOfType('confirm', msg, opts);
      },
    });

    function sendFeedback(type: 'accept' | 'dismiss', popup, evt, id) {
      // for jsx component, call custom component's hooks first
      if (typeof popup.msg != 'string') {
        const inst = componentRefs[id];
        if (inst) {
          if (type == 'accept') {
            evt = inst.onAccept?.(evt) ?? evt;
          } else if (type == 'dismiss') {
            evt = inst.onDismiss?.(evt) ?? evt;
          }
        }
      }
      if (type == 'dismiss') {
        popup.dismiss.call(popup, evt);
      } else if (type == 'accept') {
        popup.accept.call(popup, evt);
      }
    }

    const componentRefs = {};
    return {
      popups,
      sendFeedback,
      componentRefs,
    };
  },
  components: { JPopup, JIcon },
});
</script>
