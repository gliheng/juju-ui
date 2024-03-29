<template>
  <form
    class="j-form"
    ref="formRef"
    :data-inline="inline"
    :data-label-position="labelPosition"
    :data-label-alignment="labelAlignment"
    @reset="reset"
  >
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Schema } from 'b-validate';
import { useChildren } from '@utils/hooks';
import { FormSymbol } from './const';

const C = defineComponent({
  props: {
    inline: {
      type: Boolean,
      deafult: false,
    },
    model: {
      type: Object,
      required: true,
    },
    labelPosition: {
      type: String,
      default: 'left',
    },
    labelAlignment: {
      type: String,
      default: 'left',
    },
    labelWidth: {
      type: Number,
      default: 100,
    },
    rules: Object,
  },
  setup(props, { expose }) {
    let errors = ref({});
    let children = useChildren(FormSymbol, {
      errors,
    });
    let formRef = ref<HTMLFormElement>();
    
    function reset() {
      errors.value = {};
    }

    async function validate(fields?: string[]) {
      let allRules = { ... props.rules };
      for (let c of children) {
        let { rules, field } = c.props;
        if (field && rules) {
          allRules[field as string] = rules;
        }
      }
      // ensure single rules are also wrapped in array
      for (let key in allRules) {
        if (fields && fields.indexOf(key) == -1) {
          delete allRules[key];
        } else if (!Array.isArray(allRules[key])) {
          allRules[key] = [allRules[key]];
        }
      }
      return new Promise<Record<string, any>>((resolve, reject) => {
        let schema = new Schema(allRules);
        let { model } = props;
        schema.validate(model, (err: Record<string, any> | null) => {
          if (err) {
            errors.value = err;
            reject(err);
          } else {
            resolve(model);
          }
        });
      });
    }

    expose({
      reset,
      validate,
      submit() {
        formRef.value?.submit();
      },
    });
    return { reset, formRef };
  },
});

// export FormSymbol on Form class
C.FormSymbol = FormSymbol;

export default C;
</script>

<style lang="scss" src="./Form.scss"></style>
