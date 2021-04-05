export function debounce(func: Function, wait: number) {
  var timeout: ReturnType<typeof setTimeout>;
  var args = arguments;
  // @ts-ignore
  var context = this;
  return function() {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  }
}

export function throttle(func: Function, wait: number) {
  var timeout: ReturnType<typeof setTimeout> | undefined;
  // @ts-ignore
  var context = this;
  return function () {
    var args = arguments;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = undefined;
        func.apply(context, args)
      }, wait);
    }
  }
}