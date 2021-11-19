import { PaneAttrs, StrictPaneAttrs, RenderBox } from './types';

export const DIVIDER = '$divider';
export const COL = '$col';
export const ROW = '$row';

// This function normalize a user provided preset.
// String is accepted to be convenient
export function normalizePreset(genId: Generator<number, number, unknown>, preset: PaneAttrs, parent?: PaneAttrs): StrictPaneAttrs {
  let id = genId.next().value;
  // simple string name
  if (typeof preset == 'string') {
    let props, flex = 1;
    if (preset == DIVIDER) {
      flex = 0;
      props = {
        vertical: (parent as any).use == COL ? false : true,
      };
    }
    return {
      id,
      use: preset,
      flex,
      props,
    };
  }
  let ret = {
    id, ...preset
  } as StrictPaneAttrs;

  if (preset.children) {
    let children = preset.children.map((item: any) => normalizePreset(genId, item, preset));
    // normalize children flex
    let totalFlex = children.reduce((prev, curr) => {
      return (curr.flex || 0) + prev;
    }, 0);
    if (totalFlex != 0) {
      children.forEach(item => {
        if (typeof item.flex == 'number') {
          item.flex = item.flex / totalFlex;
        }
      });
      ret.children = children;
    }
    if (ret.flex === undefined) {
      ret.flex = 1;
    }
  }

  return ret;
}

// the core layout method
export function layout(
  pane: StrictPaneAttrs,
  x: number,
  y: number,
  width: number,
  height: number,
  parent?: RenderBox,
): RenderBox {
  // @ts-ignore
  let self = this || Object.create(layoutProto);
  if (pane.use == ROW || pane.use == COL)  {
    let vertical = true;
    if (pane.use == ROW) {
      vertical = false;
    }
    if (!pane.children) {
      throw '$row or $col muse have children';
    }
    let fixedSize = 0;
    let totalFlex = 0;
    let totalSize = width;
    if (vertical) totalSize = height;
    for (let i = 0; i < pane.children!.length; i++) {
      let item: any = pane.children[i];
      fixedSize += item.size || 0;
      let flex = typeof item.flex == 'number' ? item.flex! : typeof item.size == 'number' ? 0 : 1;
      totalFlex += flex;
    }
    let pos = 0;
    let children = pane.children.map(item => {
      let size;
      if (typeof item.size == 'number') {
        size = item.size || 0;
      } else {
        size = (typeof item.flex == 'number' ? item.flex : 1) / totalFlex * (totalSize - fixedSize);
      }
      let ret;
      if (vertical) {
        ret = layout(item, x, pos, width, size, self);
      } else {
        ret = layout(item, pos, y, size, height, self);
      }
      pos += size;
      return ret;
    });
    return Object.assign(self, {
      ...pane,
      x, y, width, height,
      parent,
      children,
      layoutContext: {
        flexSize: totalSize - fixedSize,
      },
    });
  }

  return Object.assign(self, {
    ...pane,
    x,
    y,
    width,
    height,
    parent,
    children: undefined,
  });
}

const layoutProto = {
  // layout the box's children
  layout(this: RenderBox, x?: number, y?: number, width?: number, height?: number) {
    layout.call(
      this,
      this,
      x || this.x,
      y || this.y,
      width || this.width,
      height || this.height,
      this.parent,
    );
  },
  removeChild(this: RenderBox, id: number): boolean {
    let parent = this.parent;
    if (!parent) return false;

    let children = parent.children!;
    let idx = children!.findIndex(item => item.id == id);
    if (idx == -1) return false;

    children.splice(idx, 1);
    // Remove potential duplicate dividers
    for (let i = 0; i < children.length;) {
      let item = children[i];
      if (children[i-1]?.use == DIVIDER && item?.use == DIVIDER) {
        children.splice(i, 1);
        continue;
      } else if ((i == 0 || i == children.length - 1) && item?.use == DIVIDER) {
        children.splice(i, 1);
        continue;
      }
      i++;
    }
    // TODO need to recursively delete empty cols and fix normalize flex
    let node = parent;
    while (node.children && node.children.length == 0) {
      let idx = node.parent?.children?.indexOf(node);
      if (idx !== undefined && idx >= 0) {
        node.parent!.children!.splice(idx, 1);
      }
      node = node.parent!;
    }

    // relayout self
    parent.layout();
    return true;
  }
};

export function *idGenerator() {
  let i = 0;
  while (true) {
    i++;
    yield i;
  }
  // This only make typescript happy
  return 0;
}