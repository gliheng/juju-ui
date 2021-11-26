import { defineComponent, h, provide } from 'vue';
import { FormController, FormSymbol } from './FormController';

export default defineComponent({
  props: {
    label: String,
    field: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let formInst = provide<FormController | undefined>(FormSymbol, undefined);
    if (formInst === undefined) {
      throw 'j-form is needed';
    }

    return () => {
      let { label } = props;
      return (
        <div class="j-form-item">
          <label>
            <span>{{ label }}</span>
            <slot></slot>
          </label>
        </div>
      );
    }
  }
});
