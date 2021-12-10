import { markRaw, h } from 'vue';
import { PaneAttrs, NormalizedPaneAttrs, LayoutContext, Library } from './types';
import Pane from './Pane';
import Divider from './Divider';

export const DIVIDER = '$divider';
export const COL = '$col';
export const ROW = '$row';

// This function normalize a user provided preset.
// String is accepted to be convenient
export function normalizePreset(
  genId: Generator<number, number, unknown>,
  preset: PaneAttrs,
  parent?: NormalizedPaneAttrs,
): NormalizedPaneAttrs {
  let id = genId.next().value;
  // simple string name
  if (typeof preset == 'string') {
    let props, flex = 1;
    if (preset == DIVIDER) {
      flex = 0;
      props = {
        vertical: parent?.use == COL ? false : true,
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
  } as NormalizedPaneAttrs;

  if (preset.children) {
    let children = preset.children.map(
      (item: any) => normalizePreset(genId, item, ret)
    );
    // normalize children flex values
    // This converted flex to float <= 1

    // calc totalFlex of the same level
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

export class RenderBox {
  use: string;
  id: number;
  props?: Record<string, unknown>;
  size?: number;
  minSize?: number;
  maxSize?: number;
  flex?: number;

  parent?: RenderBox;
  children?: RenderBox[];
  layoutContext?: LayoutContext;
  context: {
    library: Library;
    onDividerDragStart: () => void;
    onDividerDragMove: () => void;
    onDividerDragEnd: () => void;
    onAction: () => void;
  };

  x = 0;
  y = 0;
  width = 0;
  height = 0;
  expanded = false;

  constructor(args: NormalizedPaneAttrs, context: any, parent?: RenderBox) {
    this.use = args.use;
    this.id = args.id;
    this.props = args.props;
    this.size = args.size;
    this.minSize = args.minSize;
    this.maxSize = args.maxSize;
    this.flex = args.flex;
    this.children = args.children?.map(
      e => new RenderBox(e, context, this)
    );
    this.parent = parent;
    this.context = context;
    markRaw(this);
  }

  swapComponent(c: string) {
    this.use = c;
  }

  hitTest(x: number, y: number): RenderBox | undefined {
    if (
      x < this.x ||
      y < this.y ||
      x > this.x + this.width ||
      y > this.y + this.height
    ) {
      return;
    }

    if (this.children) {
      for (let c of this.children) {
        let box = c.hitTest(x, y);
        if (box) return box;
      }
    }

    if (this.isLeaf) {
      return this;
    }
  }

  get isLeaf() {
    return this.use != COL && this.use != ROW;
  }

  get root(): RenderBox {
    let node: RenderBox = this;
    while (node && node.parent) {
      node = node.parent;
    }
    return node;
  }

  expand() {
    this.expanded = true;
    this.doLayout();
  }

  contract() {
    this.expanded = false;
    this.parent?.doLayout();
  }

  // This layout method do layout using cached value
  doLayout() {
    this.layout(this.x, this.y, this.width, this.height, this.parent);
  }

  layout(
    x: number,
    y: number,
    width: number,
    height: number,
    parent?: RenderBox,
  ) {
    if (this.expanded) {
      // expanded box use root size
      let root = this.root;
      x = root.x;
      y = root.y;
      width = root.width;
      height = root.height;
    }

    Object.assign(this, {
      x,
      y,
      width,
      height,
      parent,
    });

    let { use, children } = this;
    if (use == ROW || use == COL)  {
      let vertical = true;
      if (use == ROW) {
        vertical = false;
      }
      let fixedSize = 0;
      let totalFlex = 0;
      let totalSize = width;
      if (vertical) totalSize = height;
      if (children) {
        // 1 pass: figure out remaining size for flex layout
        for (let i = 0; i < children!.length; i++) {
          let item: any = children[i];
          fixedSize += item.size || 0;
          let flex = typeof item.flex == 'number' ? item.flex! : typeof item.size == 'number' ? 0 : 1;
          totalFlex += flex;
        }
     
        let pos = 0;
        children.forEach(item => {
          let size;
          if (typeof item.size == 'number') {
            size = item.size || 0;
          } else {
            size = (typeof item.flex == 'number' ? item.flex : 1) / totalFlex * (totalSize - fixedSize);
          }
          if (vertical) {
            item.layout(x, pos, width, size, this);
          } else {
            item.layout(pos, y, size, height, this);
          }
          pos += size;
        });
        this.layoutContext = {
          flexSize: totalSize - fixedSize,
        };
      }
    }
  }

  // remove children at index i
  removeChild(i: number) {
    if (i == -1 || !this.children) return;

    this.children.splice(i, 1);
    this.fixDividers();
    if (this.isEmpty && !this.isRoot) {
      this.remove();
    } else {
      // relayout self
      this.doLayout();
    }
  }
  
  get isEmpty() {
    return !this.children || this.children.length == 0;
  }

  get isRoot() {
    return !this.parent;
  }

  // remove self
  remove() {
    if (!this.parent) throw 'Cannot remove root node';
    let parent = this.parent;
    let children = parent.children!;
    let idx = children!.findIndex(e => e == this);
    parent.removeChild(idx);
  }

  fixDividers() {
    if (!this.children) return;
    let { children } = this;
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
  }

  render(collect: JSX.Element[]) {
    if (this.children) {
      this.children.forEach(item => {
        item.render(collect);
      });
      return;
    }

    if (this.use == DIVIDER) {
      collect.push(
        <Divider
          key={ this.id }
          x={this.x}
          y={this.y}
          width={this.width}
          height={this.height}
          {...this.props}
          box={ this }
          onDragStart={ this.context.onDividerDragStart }
          onDragMove={ this.context.onDividerDragMove }
          onDragEnd={ this.context.onDividerDragEnd }
        />
      );
    }

    let node = (
      <Pane
        key={ this.id }
        use={this.use}
        x={this.x}
        y={this.y}
        width={this.width}
        height={this.height}
        expanded={this.expanded}
        box={ this }
        library={ this.context.library }
        onAction={ this.context.onAction }
      />
    );
    collect.push(node);
  }
}

export function *idGenerator() {
  let i = 0;
  while (true) {
    i++;
    yield i;
  }
  // This only make typescript happy
  return 0;
}