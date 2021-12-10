import { defineComponent, PropType, h, Fragment } from 'vue';
import { Library } from './types';
import { RenderBox } from './layout';
import Button from '../Button/Button.vue';
import Dropdown from '../Dropdown/Dropdown.vue';
import Menu from '../Menu/Menu.vue';

export default defineComponent({
  name: 'Pane',
  inheritAttrs: false,
  props: {
    id: {
      type: Number,
      required: true,
    },
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
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    function expand() {
      props.onAction('expand', props.box);
    }

    function contract() {
      props.onAction('contract', props.box);
    }

    function remove() {
      props.onAction('remove', props.box);
    }

    function replace(target: string) {
      props.onAction('replace', props.box, target);
    }
    
    return () => {
      let { x, y, width, height, expanded } = props;
      let C = props.library.find(item => item.name == props.use) as any;
      let child;
      if (C) {
        child = <C {...props.props}></C>;
      }

      let expandMenu: JSX.Element;
      if (expanded) {
        expandMenu = <Menu label="Contract" icon="contract" onClick={ contract } />;
      } else {
        expandMenu = <Menu label="Expand" icon="expand" onClick={ expand } />;
      }

      let style: Record<string, any> = {
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
      };

      return (
        <div
          class="j-flex-layout-pane"
          data-expanded={expanded}
          data-id={props.id}
          style={style}
        >
          <Dropdown align="right">
            {{
              default: () => <Button rounded flat size="sm" icon="ellipsis-horizontal" />,
              menu: () => <Menu list>
                {() => (<>
                  { expandMenu }
                  <Menu label="Remove" icon="trash" onClick={ remove } />
                  <Menu label="Replace" icon="repeat" side="left">
                    {() => props.library.map(lib => (
                      <Menu
                        label={lib.name}
                        onClick={ replace.bind(null, lib.name) }
                      />
                    ))}
                  </Menu>
                </>)}
              </Menu>
            }}
          </Dropdown>
          { child }
        </div>
      );
    };
  },
});