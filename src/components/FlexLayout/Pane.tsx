import { defineComponent, h, PropType } from 'vue';
import { RenderBox, Library } from './types';
import Button from '../Button/Button.vue';
import Dropdown from '../Dropdown/Dropdown.vue';
import Menu from '../Menu/Menu.vue';

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

      function remove() {
        props.onAction('remove', props.box);
      }

      function replace(target: string) {
        props.onAction('replace', props.box, target);
      }

      return (
        <div class="j-flex-layout-pane" style={{
          top: `${y}px`,
          left: `${x}px`,
          width: `${width}px`,
          height: `${height}px`,
        }}>
          <Dropdown align="right">
            {{
              default: () => <Button rounded flat size="sm" icon="ellipsis-horizontal" />,
              menu: () => <Menu list>
                <Menu label="Remove" icon="trash" onClick={ remove } />
                <Menu label="Replace" icon="repeat" side="left">
                  {props.library.map(lib => (
                    <Menu label={lib.name} onClick={ replace.bind(null, lib.name) } />
                  ))}
                </Menu>
              </Menu>
            }}
          </Dropdown>
          { child }
        </div>
      );
    };
  },
});