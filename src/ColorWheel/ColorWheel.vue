<template>
  <div class="j-color-wheel">
    <svg ref="svg" :width="size" :height="size"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <mask id="color-wheel-donut">
          <circle :cx="size/2" :cy="size/2" :r="shapes.ro" fill="white" />
          <circle :cx="size/2" :cy="size/2" :r="shapes.r" fill="black" />
        </mask>
        <linearGradient id="color-gradient" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" :stop-color="`hsl(${data.hue} 100% 50%)`" stop-opacity="0"/>
          <stop offset="100%" :stop-color="`hsl(${data.hue} 100% 50%)`" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="white-gradient" x1="0.5" y1="0.25" x2="0" y2="1">
          <stop offset="0%" stop-color="white" stop-opacity="0"/>
          <stop offset="100%" stop-color="white" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="black-gradient" x1="0.5" y1="0.75" x2="0" y2="0">
          <stop offset="0%" stop-color="black" stop-opacity="0"/>
          <stop offset="100%" stop-color="black" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <image mask="url(#color-wheel-donut)" href="@assets/img/color-wheel.png" :width="size" :height="size"
        @mousedown="changeHue" />
      <g :transform="`translate(${size/2} ${size/2}), rotate(${data.hue} 0 0)`" @mousedown="changeLightness">
        <path class="triangle" :d="shapes.trianglePath" fill="url(#color-gradient)" />
        <path class="triangle" :d="shapes.trianglePath" fill="url(#white-gradient)" />
        <path class="triangle" :d="shapes.trianglePath" fill="url(#black-gradient)" />
        <circle class="handle" :cx="shapes.outerPos[0]" :cy="shapes.outerPos[1]" r="6" stroke="white" stroke-width="2" fill="transparent" />
        <circle class="handle" :cx="data.x" :cy="data.y" r="6" stroke="white" stroke-width="2" fill="transparent" />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import color from '@ctrl/tinycolor';

const OUTER_CIRCLE_RATIO = 2.1;
const INNER_CIRCLE_RATIO = 2.4;
const DEFAULT_COLOR = "rgba(255,0,0,1)";

export default defineComponent({
  props: {
    size: {
      type: Number,
      default: 160,
    },
    modelValue: {
      type: String,
      default: DEFAULT_COLOR,
    },
  },
  setup(props, { emit }) {
    let colorStr = props.modelValue;
    let colorObj = reactive({
      str: colorStr,
      v: color(colorStr)!.toHsl(),
    });
    let svg = ref<HTMLElement | null>(null);

    let shapes = computed(() => {
      let r = props.size / INNER_CIRCLE_RATIO;
      let ro = props.size / OUTER_CIRCLE_RATIO;
  
      // tx ty are triangle vertex coords
      let tx = - r * Math.sin(30 / 180 * Math.PI);
      let ty = r * Math.cos(30 / 180 * Math.PI);
      let trianglePath = `M ${r} 0 L ${tx} ${ty} L ${tx} ${-ty} Z`;
  
      return {
        r, ro,
        trianglePath,
        outerPos: [(r + ro) / 2, 0],
      };
    });

    let data = computed(() => {
      let r = props.size / INNER_CIRCLE_RATIO;
      let [x, y] = hsl2xy(colorObj.v.s, colorObj.v.l, r);
      return {
        hue: colorObj.v.h,
        saturation: colorObj.v.s * 100,
        lightness: colorObj.v.l * 100,
        alpha: (colorObj.v.a || 1) * 100,
        x, y,
      };
    });

    function setColor(h?: number, s?: number, l?: number, a?: number) {
      let c = colorObj;
      if (h !== undefined) {
        c.v.h = h;
      }
      if (s !== undefined) {
        c.v.s = s;
      }
      if (l !== undefined) {
        c.v.l = l;
      }
      if (a !== undefined) {
        c.v.a = a;
      }
      c.str = color(c.v)!.toRgbString();
      emit('update:modelValue', c.str);
    }
    
    let mousedown = false, centerX = 0, centerY = 0;
    function changeHue(evt: MouseEvent, bind=true) {
      if (bind) {
        let rect = svg.value!.getBoundingClientRect();
        centerX = rect.x + rect.width / 2;
        centerY = rect.y + rect.height / 2;
      }

      let dx = evt.clientX - centerX,
      dy = evt.clientY - centerY;

      let rad = Math.atan2(dy, dx);
      let deg = rad2deg(rad);

      if (deg < 0) {
        deg += 360;
      }
      setColor(deg);
      if (bind) {
        mousedown = true;
        evt.preventDefault();
        document.addEventListener('mousemove', dragHue);
        document.addEventListener('mouseup', endDrag, { once: true });
      }
    }
    function dragHue(evt: MouseEvent) {
      if (mousedown) {
        changeHue(evt, false);
      }
    }
    
    function changeLightness(evt: MouseEvent, bind=true) {
      if (bind) {
        let rect = svg.value!.getBoundingClientRect();
        centerX = rect.x + rect.width / 2;
        centerY = rect.y + rect.height / 2;
      }

      let dx = evt.clientX - centerX,
      dy = evt.clientY - centerY;
      let r = props.size / INNER_CIRCLE_RATIO;
      let rot = deg2rad(-data.value.hue);
      let dx2 = dx * Math.cos(rot) - dy * Math.sin(rot);
      let dy2 = dx * Math.sin(rot) + dy * Math.cos(rot);
      let [s, l] = xy2sl(dx2, dy2, r);
      setColor(undefined, s, l);

      if (bind) {
        mousedown = true;
        evt.preventDefault();
        evt.stopPropagation();
        document.addEventListener('mousemove', dragLightness);
        document.addEventListener('mouseup', endDrag, { once: true });
      }
    }

    function dragLightness(evt: MouseEvent) {
      if (mousedown) {
        changeLightness(evt, false);
      }
    }

    function endDrag() {
      mousedown = false;
      document.removeEventListener('mousemove', dragHue);
      document.removeEventListener('mousemove', dragLightness);
    }

    return {
      shapes, data, svg, changeHue, changeLightness,
    };
  },
});

// x y is relative to the center of triangle
function hsl2xy(s: number, l: number, r: number): [ number, number ] {
  let w = r / 2 * 3,
    h2 = r * Math.cos(deg2rad(30)),
    h = 2 * h2;

  let xx = s * w,
    y = l * h;

  let scale = (h2 - Math.abs(y - h2)) / h2;
  let x = xx * scale;

  // translate to origin, left top corner
  return [ x - r / 2, y - h2 ];
}

// x y is relative to the center of triangle
function xy2sl(x: number, y: number, r: number): [ number, number ] {
  let w = r / 2 * 3,
    h2 = r * Math.cos(deg2rad(30)),
    h = 2 * h2;

  // translate to origin, left top corner
  let xx = x + r / 2, yy = y + h2;
  let scale = (h2 - Math.abs(yy - h2)) / h2;
  xx = xx / scale;
  let s = xx / w,
    l = yy / h;

  // todo: need better out of region fix
  if (s < 0) s = 0
  else if (s > 1) s = 1;
  
  if (l < 0) l = 0;
  else if (l > 1) l = 1;
  
  return [ s, l ];
}

function rad2deg(rad: number): number {
  return rad / Math.PI * 180;
}

function deg2rad(deg: number): number {
  return deg / 180 * Math.PI;
}

// // This generate a svg circle path points
// // It is useful in that you can use fill-rule="evenodd" to make a donut shape
// function circlePath(cx: number, cy: number, r: number) {
//   return `M ${cx - r}, ${cy}\
//     a ${r},${r} 0 1,0 ${r * 2},0\
//     a ${r},${r} 0 1,0 -${r * 2},0\
//   `;
// }

</script>

<style src="./ColorWheel.scss"></style>