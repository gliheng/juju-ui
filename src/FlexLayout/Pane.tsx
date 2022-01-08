import { defineComponent, PropType, h, Fragment } from 'vue';
import { Library } from './types';
import { RenderBox } from './layout';
import Button from '../Button/Button.vue';
import Dropdown from '../Dropdown/Dropdown.vue';
import Menu from '../Menu/Menu.vue';
import Tabs from '../Tabs/Tabs.vue';
import TabPane from '../Tabs/TabPane.vue';

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
    expanded: {
      type: Boolean,
      default: false,
    },
    context: {
      type: Object as PropType<{
        library: Library
        onAction: (action: string, box: RenderBox, args?: any) => void,
        placeholder: any,
      }>,
      required: true,
    },
  },
  setup(props) {
    function expand() {
      props.context.onAction('expand', props.box);
    }

    function contract() {
      props.context.onAction('contract', props.box);
    }

    function remove() {
      props.context.onAction('remove', props.box);
    }

    function replace(target: string) {
      props.context.onAction('replace', props.box, target);
    }
    
    return () => {
      let { x, y, width, height, expanded } = props;
      let Component = props.context.library.find(item => item.name == props.use) as any;
      let child, title;

      if (Component) {
        title = Component.label;
        let expandMenu: JSX.Element;
        if (expanded) {
          expandMenu = <Menu label="Contract" icon="contract" onClick={ contract } />;
        } else {
          expandMenu = <Menu label="Expand" icon="expand" onClick={ expand } />;
        }

        child = <>
          <Tabs>
            <TabPane label={title}>
              <Component {...props.props}></Component>
            </TabPane>
          </Tabs>
          <Dropdown align="right">
            {{
              default: () => <Button rounded flat size="sm" icon="ellipsis-horizontal" />,
              menu: () => <Menu list>
                {() => (<>
                  { expandMenu }
                  <Menu label="Remove" icon="trash" onClick={ remove } />
                  <Menu label="Replace" icon="repeat" side="left">
                    {() => props.context.library.map(lib => (
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
        </>;
      } else if (props.use) {
        child = `Cannot find component: ${props.use}`;
      } else if (props.context.placeholder) {
        child = props.context.placeholder();
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
          {child}
        </div>
      );
    };
  },
});