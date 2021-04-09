import { computed, defineComponent, ref, reactive, h, onMounted } from 'vue';
import Seperator from './Seperator';
import { useElementSize } from '../../utils/hooks';
import '../../assets/styles/CustomLayout.scss';

const builtIn = {
  [Seperator.name]: Seperator
};

interface SizeProps {
  flex?: number,
  width?: number,
  minWidth?: number,
  maxWidth?: number,
  height?: number,
  minHeight?: number,
  maxHeight?: number,
}

type Pane = Partial<{
  layout: 'row' | 'column',
  children: Pane[],
}> & Partial<{
  name: string,
  props: Record<string, any>,
}> & SizeProps;

type Layout = {
  name: string,
  id?: number,
  top: number,
  left: number,
  width: number,
  height: number,
  props?: any,
}[];

export default defineComponent({
  props: {
    library: {
      type: Object,
      required: true,
    },
    preset: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let elm = ref<HTMLDivElement>();
    let layout = ref();
    
    onMounted(() => {
      let w = elm.value!.clientWidth;
      let h = elm.value!.clientHeight;
      layout.value = doLayout(props.preset as Pane, {
        width: w, height: h,
      });
    });

    function renderComponents(layout: Layout) {
      return layout.map(frame => {
        let c = builtIn[frame.name];
        if (c) {
          let props = {
            width: frame.width,
            height: frame.height,
            top: frame.top,
            left: frame.left,
            ...frame.props,
          };
          if (frame.name == Seperator.name) {
            let onMouseMove = (evt: MouseEvent) => {
              console.log('mouse move');
            };
            props.onStartDrag = function(id: number, x: number, y: number) {
              document.addEventListener('mousemove', onMouseMove);
            };
            props.onEndDrag = function() {
              document.removeEventListener('mousemove', onMouseMove);
            };
          }
          return h(c, props);
        }
        c = props.library[frame.name];
        return (
          <div class="j-custom-layout-frame" style={{
            top: `${frame.top}px`,
            left: `${frame.left}px`,
            width: `${frame.width}px`,
            height: `${frame.height}px`,
          }}>
            { h(c) }
          </div>
        );
      });
    }
    return () => {
      return (
        <div class="j-custom-layout" ref={elm}>
          { layout.value && renderComponents(layout.value) }
        </div>
      );
    };
  },
});

function doLayout(preset: Pane, size: { width: number, height: number }): Layout {
  if (size.width == 0 && size.height == 0) {
    return [];
  }
  function *idGenerator() {
    let i = 0;
    while (true) {
      i++;
      yield i;
    }
  }
  let ret: Layout = [];
  layoutFrame(preset, 0, 0, size.width, size.height, idGenerator(), ret);
  return ret;
}

function layoutFrame(
  preset: Pane, top: number, left: number, width: number, height: number,
  idGenerator: Generator<number, void, unknown>,
  ret: Layout,
) {
  if (preset.layout == 'row') {
    if (preset.children) {
      let usedWidth = 0, totalFlex = 0;
      preset.children.forEach(item => {
        usedWidth += item.width || 0;
        totalFlex += item.flex || 0;
      });
      let accumulateLeft = 0;
      preset.children.forEach((item, i) => {
        let w = width;
        if (item.width) {
          w = item.width;
        } else if (width > usedWidth) {
          w = (item.flex || 1) / (totalFlex || 1) * (width - usedWidth);
        }
        layoutFrame(item, top, left + accumulateLeft, w, height, idGenerator, ret);
        accumulateLeft += w;
        // insert seperator
        if (i != preset.children?.length! - 1) {
          ret.push({
            name: Seperator.name,
            props: { vertical: true },
            id: idGenerator.next().value as number,
            top: top,
            left: accumulateLeft,
            width: 0,
            height,
          });
        }
      });
    }
  } else if (preset.layout == 'column') {
    if (preset.children) {
      let usedHeight = 0, totalFlex = 0;
      preset.children.forEach(item => {
        usedHeight += item.height || 0;
        totalFlex += item.flex || 0;
      });
      let accumulateTop = 0;
      preset.children.forEach((item, i) => {
        let h = height;
        if (item.height) {
          h = item.height;
        } else if (height > usedHeight) {
          h = (item.flex || 1) / (totalFlex || 1) * (height - usedHeight);
        }
        layoutFrame(item, top + accumulateTop, left, width, h, idGenerator, ret);
        accumulateTop += h;
        // insert seperator
        if (i != preset.children?.length! - 1) {
          ret.push({
            name: Seperator.name,
            props: { vertical: false },
            id: idGenerator.next().value as number,
            top: accumulateTop,
            left,
            width,
            height: 0,
          });
        }
      });
    }
  } else if (preset.name) {
    ret.push({
      name: preset.name,
      top, left, width, height,
    });
  }
}