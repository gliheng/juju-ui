import { markRaw, h, reactive } from 'vue';
import { PaneAttrs, NormalizedPaneAttrs, LayoutContext, Library, Dimension } from './types';
import Divider from '../Divider/Divider';
import Pane from './Pane';
import PaneContent from './PaneContent';

export const DIVIDER = '$divider';
export const COL = '$col';
export const ROW = '$row';
export const TAB = '$tab';

export enum HitTestAlignment {
  Tabbar,
  Top,
  Left,
  Right,
  Bottom,
  Center,
}

enum Axis {
  X,
  Y,
}

/**
 * Normalize a user provided preset. */ 
export function normalizePreset(
  preset?: PaneAttrs,
): NormalizedPaneAttrs {
  if (!preset) return {
    use: '',
  };
  // simple string name
  if (typeof preset == 'string') {
    let props, flex = 1;
    if (preset == DIVIDER) {
      flex = 0;
    }
    return {
      use: preset,
      flex,
      props,
    };
  }

  let ret = {
    ...preset
  } as NormalizedPaneAttrs;

  if (preset.children) {
    ret.children = preset.children.map(
      (item: any) => normalizePreset(item)
    );
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
  tabs?: string[];

  parent?: RenderBox;
  children?: RenderBox[];
  layoutContext?: LayoutContext;
  context: {
    library: Library;
    onDividerDragStart: () => void;
    onDividerDragMove: () => void;
    onDividerDragEnd: () => void;
    onAction: (action: string, box: RenderBox, args?: any) => void;
    placeholder: any;
    showActionMenu: boolean;
    closable: boolean;
  };

  x = 0;
  y = 0;
  width = 0;
  height = 0;
  expanded = false;

  constructor(args: NormalizedPaneAttrs, context: any, parent?: RenderBox) {
    this.id = context.idGen.next().value;
    this.use = args.use;
    this.props = args.props;
    this.size = args.size;
    this.minSize = args.minSize;
    this.maxSize = args.maxSize;
    if (this.use) {
      if (this.use == TAB) {
        let tabsProp = this.props?.tabs as string[];
        if (!tabsProp) {
          console.error('tabs prop not set for $tab component');
        } else {
          this.tabs = reactive([...tabsProp]);
        }
      } else {
        this.tabs = reactive([this.use]);
      }
    }
    this.children = args.children?.map(
      e => {
        return new RenderBox(e, context, this)
      },
    );
    if (this.size === undefined) {
      this.flex = args.flex !== undefined ? args.flex : 1;
    }
    this.parent = parent;
    this.context = context;
    markRaw(this);
  }

  swapComponent(c: string) {
    this.use = c;
    this.tabs = [c];
  }

  /**
   * Make changes When a drag is dropped onto this box
   */
  splitComponent(c: string, alignment?: HitTestAlignment) {
    if (alignment == HitTestAlignment.Center) {
      if (this.isRoot) {
        this.use = ROW;
        this.appendChildren([c]);
        this.doLayout();
      } else {
        // replace the current component
        this.swapComponent(c);
      }
    } else if (
      this.parent?.use == ROW &&
      (alignment == HitTestAlignment.Left || alignment == HitTestAlignment.Right)
      ) {
      // If this box is already inside a parent row container
      // insert c into parent container
      let i = this.elementIndex;
      if (alignment == HitTestAlignment.Right) {
        i++;
        this.parent.insertChild(c, i);
        this.parent.insertChild(DIVIDER, i);
      } else {
        this.parent.insertChild(DIVIDER, i);
        this.parent.insertChild(c, i);
      }
      this.parent.doLayout();
    } else if (
      this.parent?.use == COL &&
      (alignment == HitTestAlignment.Top || alignment == HitTestAlignment.Bottom)
    ) {
      // If this box is already inside a parent col container
      // insert c into parent container
      let i = this.elementIndex;
      if (alignment == HitTestAlignment.Bottom) {
        i++;
        this.parent.insertChild(c, i);
        this.parent.insertChild(DIVIDER, i);
      } else {
        this.parent.insertChild(DIVIDER, i);
        this.parent.insertChild(c, i);
      }
      this.parent.doLayout();
    } else if (alignment == HitTestAlignment.Tabbar) {
      this.use = TAB;
      this.tabs?.push(c);
    } else {
      // normal split
      let oldBox = {
        use: this.use,
        props: this.props,
      };
      if (!this.children) {
        this.children = [];
      }
      if (alignment == HitTestAlignment.Left) {
        this.use = ROW;
        this.appendChildren([
          c, DIVIDER, oldBox,
        ]);
      } else if (alignment == HitTestAlignment.Right) {
        this.use = ROW;
        this.appendChildren([
          oldBox, DIVIDER, c,
        ]);
      } else if (alignment == HitTestAlignment.Top) {
        this.use = COL;
        this.appendChildren([
          c, DIVIDER, oldBox,
        ]);
      } else if (alignment == HitTestAlignment.Bottom) {
        this.use = COL;
        this.appendChildren([
          oldBox, DIVIDER, c,
        ]);
      }
      this.doLayout();
    }
  }

  appendChildren(children: PaneAttrs[]) {
    let c = normalizePreset({
      use: '',
      children
    });

    this.children = c.children!.map(
      e => new RenderBox(e, this.context, this),
    );
  }

  insertChild(c: PaneAttrs, i: number): RenderBox {
    let newBox = new RenderBox(
      normalizePreset(c), this.context, this,
    );
    this.children?.splice(i, 0, newBox);
    return newBox
  }

  /**
   * Drag behavior use this method to determine drop location
   * x, y are relative positions
  */
  hitTest(x: number, y: number): {
    box: RenderBox;
    dimension: Dimension;
    alignment: HitTestAlignment;
  } | undefined {
    if (
      x < this.x ||
      y < this.y ||
      x > this.x + this.width ||
      y > this.y + this.height
    ) {
      return;
    }

    // If this is a container, delegate hitTest to children
    if (this.children) {
      for (let c of this.children) {
        let box = c.hitTest(x, y);
        if (box) return box;
      }
    }

    if (this.isLeaf || this.isRoot) {      
      let alignment = this.getAlignment(x, y);
      let dimension = this.alignmentToDimensions(alignment);
      
      return {
        box: this,
        dimension,
        alignment,
      };
    }
  }

  get isLeaf() {
    return !this.children;
  }

  get isDummy() {
    return !this.use;
  }

  get isEmpty() {
    return !this.children || this.children.length == 0;
  }

  get isRoot() {
    return !this.parent;
  }

  get root(): RenderBox {
    let node: RenderBox = this;
    while (node && node.parent) {
      node = node.parent;
    }
    return node;
  }

  get elementIndex() {
    let i = this.parent?.children?.indexOf(this);
    return i === undefined ? -1 : i;
  }

  expand() {
    this.expanded = true;
    this.doLayout();
  }

  contract() {
    this.expanded = false;
    this.parent?.doLayout();
  }

  /**
   * Do layout using cached dimensions */
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
     
        // 2 pass: layout children using flex values
        let pos = 0;
        if (vertical) {
          pos = this.y;
        } else {
          pos = this.x;
        }
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
          totalFlex,
          flexSize: totalSize - fixedSize,
        };
      }
    }
  }

  /**
   * remove children at index i */
  removeChild(i: number) {
    if (i == -1 || !this.children) return;

    this.children.splice(i, 1);
    this.fixDividers();
    if (this.isEmpty) {
      if (this.isRoot) {
        // If the root container is empty, change it to an empty pane
        this.use = '';
        this.children = undefined;
      } else {
        // If non-root container is empty, remove itself
        this.remove();
      }
    } else {
      // relayout self
      this.doLayout();
    }
  }

  /** remove self */
  remove() {
    if (!this.parent) throw 'Cannot remove root node';
    let parent = this.parent;
    let children = parent.children!;
    let idx = children!.findIndex(e => e == this);
    parent.removeChild(idx);
  }

  /** Remove potential duplicate dividers caused by modifying layout */
  fixDividers() {
    if (!this.children) return;
    let { children } = this;
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

    // Single child cannot have size constrains
    if (children.length == 1) {
      let onlyChild = children[0];
      onlyChild.size = undefined;
      onlyChild.minSize = undefined;
      onlyChild.maxSize = undefined;
      onlyChild.flex = 1;
    }
  }

  /**
   * When a drag is over this box, determine the alignment of the hint box
   */
  getAlignment(cursorX: number, cursorY: number): HitTestAlignment {
    let xScale = makeScale(this.x, this.width);
    let yScale = makeScale(this.y, this.height);
    let boxes: [Axis, number[], HitTestAlignment][] = [
      [Axis.X, xScale([0, 0.2]), HitTestAlignment.Left],
      [Axis.X, xScale([0.8, 1]), HitTestAlignment.Right],
      [Axis.Y, yScale([0, 0.2]), HitTestAlignment.Top],
      [Axis.Y, yScale([0.8, 1]), HitTestAlignment.Bottom],
    ];

    // only do tabbar match when there's tabbar
    if (!this.isDummy) {
      boxes.unshift([Axis.Y, [this.y + 0, this.y + this.tabHeight], HitTestAlignment.Tabbar]);
    }

    for (let [kind, [start, end], align] of boxes) {
      if (kind == Axis.X) {
        if (cursorX >= start && cursorX <= end) {
          return align;
        }
      } else if (kind == Axis.Y) {
        if (cursorY >= start && cursorY <= end) {
          return align;
        }
      }
    }
    return HitTestAlignment.Center;
  }

  // TODO: get tab height from dom
  get tabHeight() {
    if (this.isDummy) return 0;
    return 33;
  }

  alignmentToDimensions(align: HitTestAlignment): Dimension {
    let { x, y, width, height } = this;
    if (align == HitTestAlignment.Tabbar) {
      height = this.tabHeight;
    } else {
      height -= this.tabHeight;
      y += this.tabHeight;
      if (align == HitTestAlignment.Top) {
        height /= 2;
      } else if (align == HitTestAlignment.Bottom) {
        height /= 2;
        y += height;
      } else if (align == HitTestAlignment.Left) {
        width /= 2;
      } else if (align == HitTestAlignment.Right) {
        width /= 2;
        x += width;
      }
    }
    return {
      x,
      y,
      width,
      height,
    };
  }

  renderLeafContent(): JSX.Element {
    if (!this.use) {
      return this.context.placeholder();
    }
    const onRemove = (i: number) => {
      this.tabs?.splice(i, 1);
      if (this.tabs?.length == 0) {
        this.context.onAction('remove', this);
      }
    };

    return (
      <PaneContent
        expanded={this.expanded}
        context={this.context}
        box={this}
        closable={this.context.closable}
        tabs={this.tabs}
        onRemove={onRemove}
      />
    );
  }

  render(collect: JSX.Element[]) {
    if (this.isLeaf) {
      let node;
      if (this.use == DIVIDER) {
        node = (
          <Divider
            key={this.id}
            positioned={true}
            x={this.x}
            y={this.y}
            width={this.width}
            height={this.height}
            vertical={this.parent?.use == ROW}
            onDragStart={this.context.onDividerDragStart.bind(null, this)}
            onDragMove={this.context.onDividerDragMove.bind(null, this)}
            onDragEnd={this.context.onDividerDragEnd.bind(null, this)}
          />
        );
      } else {
        node = (
          <Pane
            key={this.id}
            id={this.id}
            x={this.x}
            y={this.y}
            width={this.width}
            height={this.height}
            expanded={this.expanded}
            box={this}
            showActionMenu={Boolean(this.use) && this.context.showActionMenu}
            context={this.context}
          >
            {() => this.renderLeafContent()}
          </Pane>
        );
      }
      collect.push(node);
    } else {
      this.children!.forEach(item => {
        item.render(collect);
      });
    }
  }
}

function makeScale(start: number, extent: number) {
  return (pts: number[]): number[] => {
    return pts.map(e => start + extent * e);
  };
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