import { InjectionKey, Slots } from 'vue';

export const treeInjectKey = Symbol('Tree inject key') as InjectionKey<{
  slots: Slots,
  keyField?: string;
  itemRenderer: 'nav' | 'default';
}>;

export type TreeItemType = {
  label: string;
  icon: string;
  [key: string]: any;
  getChildren?: (node: TreeItemType) => Promise<TreeItemType[]>,
  children?: TreeItemType[];
}
