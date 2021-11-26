import { defineComponent, h, defineExpose, provide } from 'vue';
import { FormController, FormSymbol } from './FormController';

export default defineComponent({
  props: {
    form: {
      type: Object,
      required: true,
    },
    initialValues: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let formCtrl = new FormController(props.initialValues || props.form);
    provide(FormSymbol, formCtrl);
    
    defineExpose({
      reset() {
        formCtrl.reset();
      },
      validate() {
        return formCtrl.validate();
      },
    });

    return () => (
      <form>
        <slot></slot>
      </form>
    );
  }
});
