import mitt, { Emitter as EmitterBase, EventType } from 'mitt';

class Emitter {
  constructor() {
    Object.assign(this, mitt());
  }
}

type Events = Record<EventType, unknown>;

type ClassEmitter<T> = {
  new(): ClassEmitter<T>;
} & EmitterBase<Events>;

export default Emitter as unknown as ClassEmitter<Events>;
