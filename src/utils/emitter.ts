import mitt, { Emitter as EmitterBase } from 'mitt';

class Emitter {
  constructor() {
    Object.assign(this, mitt());
  }
}

export default Emitter as unknown as {
  new(): EmitterBase;
} & EmitterBase;