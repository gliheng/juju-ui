import { ref, Ref } from 'vue';
import { show as showBackdrop, hide as hideBackdrop } from './backdrop';
import { get as getConfig } from './config';

// -1 effectively hide the layer
interface Layer {
  id: number,
  modal: boolean,
  z: number,
  cbk?: Function,
}
let depthes: Record<number, Ref<number>> = {};
let layers: Array<Layer> = [];

function backdropClicked() {
  if (layers.length == 0) return;
  let { cbk } = layers[layers.length - 1];
  if (typeof cbk == 'function') {
    cbk();
  }
}

export function top(): number {
  if (layers.length == 0) {
    return getConfig().popupBaseDepth;
  }
  return layers[layers.length - 1].z + 1;
}

// allocate a controlled ref zindex value
export function alloc(id: number): Ref<number> {
  if (id in depthes) {
    // Is this necessary?
    // I donno when this could happen
    return depthes[id];
  }
  let r = ref(-1);
  depthes[id] = r;
  return r;
}

export function open(id: number, modal: boolean, cbk?: () => void ) {
  let z = top();
  layers.push({ id, modal, z, cbk });
  depthes[id].value = z;
  if (modal) showBackdrop(z, backdropClicked);
}

export function close(id: number) {
  let i = layers.findIndex(layer => layer.id == id);
  if (i == -1) return;

  layers.splice(i, 1);
  depthes[id].value = -1;

  // check if backdrop is needed
  let z;
  for (let i = layers.length - 1; i >= 0; i--) {
    if (layers[i].modal) {
      z = layers[i].z;
      break;
    }
  }
  if (typeof z == 'number') {
    showBackdrop(z);
  } else {
    hideBackdrop();
  }
}

// move a layer to the top
export function touch(id: number) {
  if (!(id in depthes)) return;
  let i = layers.findIndex(layer => layer.id == id);
  let layer = layers.splice(i, 1)[0];
  let z = top();
  layer.z = z;
  depthes[layer.id].value = z;
  layers.push(layer);
}
  
export function revoke(id: number) {
  let z = depthes[id].value;
  if (z != -1) {
    // if the layer is not hidden
    close(id);
  }
  delete depthes[id];
}
