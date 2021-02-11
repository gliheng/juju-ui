import Emitter from '../utils/emitter';


const WHEEL_SPEED = 0.8;

class Scrollbar extends Emitter {
  scrollEl?: HTMLElement;
  scroll: number = 0;
  maxScroll: number = 0;
  scrollStart: number = 0;
  mouseStart: number = 0;  

  constructor(
    public scrollerEl: HTMLElement,
    public scrollbarEl: HTMLElement,
    public horizontal: boolean = false,
  ) {
    super();
  }

  updateScrollSize(clientSize: number, scrollSize: number) {
    // able to scroll in this single direction
    if (clientSize < scrollSize) {
      if (!this.scrollEl) {
        // create scrollbar if not created
        this.scrollEl = this.createScroll(this.horizontal ? 'j-scroll-x' : 'j-scroll-y');
        let bar = this.scrollEl.firstElementChild as HTMLElement;
        bar.addEventListener('mousedown', this.handleEvent);
      }
      // adjust scrollbar size
      let barSize = Math.max(20, clientSize / scrollSize * clientSize);
      let bar = this.scrollEl.firstElementChild as HTMLElement;
      if (this.horizontal) {
        bar.style.width = `${barSize}px`;
      } else {
        bar.style.height = `${barSize}px`;
      }
      this.maxScroll = clientSize - barSize;
      // if (!this.scrollerEl.classList.contains(scrollClass)) {
      //   this.scrollerEl.classList.add(scrollClass);
      // }
    } else if (this.scrollEl) {
      this.scrollEl.hidden = true;
      // if (this.scrollerEl.classList.contains(scrollClass)) {
      //   this.scrollerEl.classList.remove(scrollClass);
      // }
    }
  }

  updateScrollPos(scroll: number, clientSize: number, scrollSize: number) {
    if (this.scrollEl) {
      if (clientSize < scrollSize) {
        this.scroll = (scroll) / (scrollSize - clientSize) * this.maxScroll;
        (this.scrollEl.firstElementChild as HTMLElement).style.transform = `${this.scrollProp}(${this.scroll}px)`;
      } else {
        this.scrollEl.hidden = true;
      }
    }
  }

  createScroll(klass: string) {
    let div = document.createElement('div');
    div.className = klass;
    let bar = document.createElement('div');
    bar.className = 'j-scroll-handle';
    div.appendChild(bar);
    this.scrollbarEl.appendChild(div);
    return div;
  }

  get scrollProp() {
    return this.horizontal ? 'translateX' : 'translateY';
  }

  handleEvent = (evt: MouseEvent) => {
    if (evt.type == 'mousedown') {
      this.scrollStart = this.scroll;
      this.mouseStart = this.horizontal ? evt.clientX : evt.clientY;
      this.emit('drag', true);
      this.scrollEl!.dataset.dragging = '';
      this.scrollEl!.style.zIndex = '1';
      window.addEventListener('mousemove', this);
      window.addEventListener('mouseup', this);
      evt.preventDefault();
    } else if (evt.type == 'mousemove') {
      let mousePos = this.horizontal ? evt.clientX : evt.clientY;
      let scroll = this.scrollStart + mousePos - this.mouseStart;
      scroll = Math.max(0, scroll);
      scroll = Math.min(scroll, this.maxScroll);
      (this.scrollEl!.firstElementChild as HTMLElement).style.transform = `${this.scrollProp}(${scroll}px)`;
      this.scroll = scroll;
      let containerScroll;
      if (this.horizontal) {
        containerScroll = (this.scrollerEl.scrollWidth - this.scrollerEl.clientWidth) * this.scroll / this.maxScroll;
        this.scrollerEl.scrollLeft = containerScroll;
      } else {
        containerScroll = (this.scrollerEl.scrollHeight - this.scrollerEl.clientHeight) * this.scroll / this.maxScroll;
        this.scrollerEl.scrollTop = containerScroll;
      }
      this.emit('scroll', containerScroll);
    } else if (evt.type == 'mouseup') {
      window.removeEventListener('mousemove', this)
      window.removeEventListener('mouseup', this)
      this.emit('drag', false);
      delete this.scrollEl!.dataset.dragging;
      this.scrollEl!.style.zIndex = '';
    }
  }
}

declare let ResizeObserver: any;

class Scroller {
  el: HTMLElement;
  scrollbarEl: HTMLElement;
  scrollbarX: Scrollbar;
  scrollbarY: Scrollbar;
  drag: boolean = false;
  // @ts-ignore
  observer: ResizeObserver;

  constructor(el: HTMLElement) {
    this.el = el;

    if (typeof window.onwheel !== 'undefined') {
      this.el.addEventListener('wheel', this);
    } else if (typeof window.onmousewheel !== 'undefined') {
      this.el.addEventListener('mousewheel', this);
    }
    // this.el.addEventListener('scroll', (evt: Event) => {
    //   evt.preventDefault();
    //   evt.stopPropagation();
    // });

    let cw = el.clientWidth, sw = el.scrollWidth;
    let ch = el.clientHeight, sh = el.scrollHeight;
    let scrollbarEl = document.createElement('div');
    el.appendChild(scrollbarEl);
    scrollbarEl.className = 'j-scroll-bar';
    this.scrollbarEl = scrollbarEl;
    this.scrollbarX = new Scrollbar(el, scrollbarEl, true);
    this.scrollbarX.updateScrollSize(cw, sw);
    this.scrollbarX.on<boolean>('drag', this.setDrag);
    this.scrollbarX.on('scroll', scroll => {
      this.setScrollPos(scroll, this.el.scrollTop);
    });
    this.scrollbarY = new Scrollbar(el, scrollbarEl, false);
    this.scrollbarY.updateScrollSize(ch, sh);
    this.scrollbarY.on<boolean>('drag', this.setDrag);
    this.scrollbarY.on('scroll', scroll => {
      this.setScrollPos(this.el.scrollLeft, scroll);
    });

    if (typeof ResizeObserver == 'function') {
      // @ts-ignore
      this.observer = new ResizeObserver(_entries => {
        // @ts-ignore
        let cw = el.clientWidth,
          ch = el.clientHeight,
          sw = el.scrollWidth,
          sh = el.scrollHeight;
        this.scrollbarX.updateScrollSize(cw, sw);
        this.scrollbarY.updateScrollSize(ch, sh);
      });
      this.observer.observe(el);
      if (el.firstElementChild) {
        // in case content changes size
        this.observer.observe(el.firstElementChild);
      }
    }
  }

  setDrag = (v?: boolean) => {
    this.drag = v!;
  }

  setScrollPos(left: number, top: number) {
    this.scrollbarEl.style.transform = `translate(${left}px, ${top}px)`;
  }

  handleEvent(evt: MouseEvent) {
    let [ deltaX, deltaY ] = getDeltaFromEvent(evt);
    let sl = this.el.scrollLeft, st = this.el.scrollTop;
    let sw = this.el.scrollWidth, cw = this.el.clientWidth;
    let sh = this.el.scrollHeight, ch = this.el.clientHeight;
    // let oldSl = sl, oldSt = st;
    if (deltaX) {
      sl += deltaX * WHEEL_SPEED;
      sl = Math.max(0, Math.min(sl, sw - cw));
    }
    if (deltaY) {
      st += deltaY * WHEEL_SPEED;
      st = Math.max(0, Math.min(st, sh - ch));
    }
    this.el.scrollLeft = sl;
    this.el.scrollTop = st;

    sl = this.el.scrollLeft;
    st = this.el.scrollTop;

    this.scrollbarX.updateScrollPos(sl, cw, sw);
    this.scrollbarY.updateScrollPos(st, ch, sh);
    this.setScrollPos(sl, st);

    // If scrolled in any direction, prevent the scroll event later
    // if (sl != oldSl || st != oldSt) {
    evt.preventDefault();
    evt.stopPropagation();
    // }
  }

  syncScroll() {
    let sl = this.el.scrollLeft, st = this.el.scrollTop;
    let sw = this.el.scrollWidth, cw = this.el.clientWidth;
    this.scrollbarX.updateScrollPos(sl, cw, sw);
    let sh = this.el.scrollHeight, ch = this.el.clientHeight;
    this.scrollbarY.updateScrollPos(st, ch, sh);
    this.setScrollPos(sl, st);
  }

  dispose() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

const ScrollerSymbol = Symbol('ScrollerSymbol');

export default {
  mounted(el: HTMLElement) {
    el.classList.add('j-scroller');
    (el as any)[ScrollerSymbol] = new Scroller(el);
  },
  unmounted(el: HTMLElement) {
    (el as any)[ScrollerSymbol].dispose();
  },
};

function getDeltaFromEvent(e: any) {
  let deltaX = e.deltaX;
  let deltaY = e.deltaY;

  if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
    deltaX = e.wheelDeltaX / 6;
    deltaY = e.wheelDeltaY / 6;
  }

  if (e.deltaMode && e.deltaMode === 1) {
    // Firefox in deltaMode 1: Line scrolling
    deltaX *= 10;
    deltaY *= 10;
  }

  if (e.shiftKey) {
    // reverse axis with shift key
    return [-deltaY, -deltaX];
  }
  return [deltaX, deltaY];
}
