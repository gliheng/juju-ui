import { defineComponent, computed, PropType, inject, Transition, h } from 'vue';
import Icon from '@/Icon/Icon.vue';
import ripple from '@directives/ripple';
import { useSwitch } from '@utils/hooks';
import { treeInjectKey, TreeItemType } from './constants';

export default defineComponent({
  props: {
    level: Number,
    path: String,
    index: Number,
    item: {
      type: Object as PropType<TreeItemType>,
      required: true,
    },
  },
  directives: { ripple },
  setup(props) {
    const { slots: treeSlots, display, selected, keyField, labelField } = inject(treeInjectKey)!;
    let [on, toggle] = useSwitch(false);
    let isLeaf = computed<boolean>(() => !props.item.children && !props.item?.getChildren);
    let itemPath = computed(() => {
      const { path, index } = props;
      return path ? `${path}::${index}` : `${index}`;
    });
    let isSelected = computed(() => selected.value == itemPath.value);

    function onClick() {
      toggle();
    }

    return () => {
      let indent = renderIndent(props.level || 0);
      let { item, level } = props;
      let chevron, icon, extension;
      if (!isLeaf.value) {
        chevron = <Icon class="j-tree-arrow" name="chevron-forward" />;
      }
      if (item.icon) {
        icon = <Icon class="j-tree-icon" name={item.icon} />
      }
      if (treeSlots.extension) {
        extension = treeSlots.extension({ item });
      }
      let label = <span>{ labelField ? item[labelField] : item.label }</span>;
      let spacer = <div class="j-spacer" />;
      let jsx: Record<string, JSX.Element[] | JSX.Element | undefined> = { indent, chevron, icon, label, spacer, extension };
      return (
        <div class="j-tree-item" data-selected={isSelected.value}>
          <div
            class="j-tree-row"
            onClick={onClick}
            v-ripple
            data-tree-path={itemPath.value}
            data-open={on.value}
          >
            { display.map(e => jsx[e]) }
          </div>
          <Transition name="j-expand">
            {!isLeaf.value && on.value && (
              <j-tree
                data={item.children}
                level={level! + 1}
                path={itemPath.value}
                keyField={keyField}
                labelField={labelField}
              />
            )}
          </Transition>
        </div>
      );
    };
  },
});

function renderIndent(level: number, collect: JSX.Element[] = []) {
  for (let i = 0; i < level; i++) {
    collect.push(<div class="j-tree-row-indent"></div>);
  }
  return collect;
}