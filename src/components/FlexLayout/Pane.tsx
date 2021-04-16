import { defineComponent, h, PropType } from 'vue';
import { RenderBox, Library } from './types';
import Button from '../Button.vue';
import Dropdown from '../Dropdown/Dropdown';

export default defineComponent({
  name: 'Pane',
  inheritAttrs: false,
  props: {
    use: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    box: {
      type: Object as PropType<RenderBox>,
      required: true,
    },
    props: Object,
    library: {
      type: Object as PropType<Library>,
      required: true,
    },
    onAction: {
      type: Function as PropType<(action: string, box: RenderBox, args?: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      let { x, y, width, height } = props;
      let C = props.library.find(item => item.name == props.use) as any;
      let child;
      if (C) {
        child = <C {...props.props}></C>;
      }
      let options = [
        // {
        //   icon: 'repeat',
        //   label: 'Replace',
        //   onClick() {
        //   },
        // },
        {
          icon: 'trash',
          label: 'Remove',
          onClick() {
            props.onAction('remove', props.box);
          },
        },
      ];
      return (
        <div class="j-flex-layout-pane" style={{
          top: `${y}px`,
          left: `${x}px`,
          width: `${width}px`,
          height: `${height}px`,
        }}>
          <Dropdown align="right" options={options}>
            {() => <Button rounded flat size="sm" icon="ellipsis-horizontal" />}
          </Dropdown>
          { child }
        </div>
      );
    };
  },
});