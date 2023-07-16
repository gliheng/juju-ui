import { defineComponent } from "vue"

export const CustomPopup = defineComponent({
  setup() {
    return () => <div>This is a custom popup</div>
  },
  methods: {
    onDismiss(evt) {
      return ':(';
    },
    onAccept(evt) {
      return ':)';
    },
  },
});
