import { InjectionKey, Slots, Ref } from 'vue';

export const treeInjectKey = Symbol('Tree inject key') as InjectionKey<{
  slots: Slots,
  keyField?: string;
  labelField?: string;
  display: string[];
  selected: Ref<string>;
}>;

export type TreeItemType = {
  label: string;
  icon: string;
  [key: string]: any;
  getChildren?: (node: TreeItemType) => Promise<TreeItemType[]>,
  children?: TreeItemType[];
}
