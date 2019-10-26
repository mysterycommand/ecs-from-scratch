export const {
  devicePixelRatio: dpr,
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf
} = window;

interface Listener<T extends keyof HTMLElementEventMap> extends EventListener {
  (event: HTMLElementEventMap[T]): void;
}

export function on<T extends EventTarget, U extends keyof HTMLElementEventMap>(
  target: T,
  type: U,
  listener: Listener<U>,
  options?: boolean | AddEventListenerOptions
) {
  target.addEventListener(type, listener, options);
}

export function once<
  T extends EventTarget,
  U extends keyof HTMLElementEventMap
>(
  target: T,
  type: U,
  listener: Listener<U>,
  options?: boolean | AddEventListenerOptions
) {
  on(target, type, listener, {
    ...(typeof options === "boolean" ? { capture: options } : options),
    once: true
  });
}

export function off<T extends EventTarget, U extends keyof HTMLElementEventMap>(
  target: T,
  type: U,
  listener: Listener<U>,
  options?: boolean | AddEventListenerOptions
) {
  target.removeEventListener(type, listener, options);
}
