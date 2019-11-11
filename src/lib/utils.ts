export const {
  devicePixelRatio: dpr,
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
} = window;

interface Listener<T extends keyof HTMLElementEventMap> extends EventListener {
  (event: HTMLElementEventMap[T]): void;
}

export function on<T extends EventTarget, U extends keyof HTMLElementEventMap>(
  target: T,
  type: U,
  listener: Listener<U>,
  options?: boolean | AddEventListenerOptions,
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
  options?: boolean | AddEventListenerOptions,
) {
  on(target, type, listener, {
    ...(typeof options === 'boolean' ? { capture: options } : options),
    once: true,
  });
}

export function off<T extends EventTarget, U extends keyof HTMLElementEventMap>(
  target: T,
  type: U,
  listener: Listener<U>,
  options?: boolean | AddEventListenerOptions,
) {
  target.removeEventListener(type, listener, options);
}

export function query<K extends keyof HTMLElementTagNameMap>(
  node: ParentNode,
  selectors: K,
): HTMLElementTagNameMap[K] | null;
export function query<K extends keyof SVGElementTagNameMap>(
  node: ParentNode,
  selectors: K,
): SVGElementTagNameMap[K] | null;
export function query<E extends Element = Element>(
  node: ParentNode,
  selectors: string,
): E | null;
export function query(node: ParentNode, selectors: string) {
  return node.querySelector(selectors);
}

export function queryAll<K extends keyof HTMLElementTagNameMap>(
  node: ParentNode,
  selectors: K,
): NodeListOf<HTMLElementTagNameMap[K]>;
export function queryAll<K extends keyof SVGElementTagNameMap>(
  node: ParentNode,
  selectors: K,
): NodeListOf<SVGElementTagNameMap[K]>;
export function queryAll<E extends Element = Element>(
  node: ParentNode,
  selectors: string,
): NodeListOf<E>;
export function queryAll(node: ParentNode, selectors: string) {
  return node.querySelectorAll(selectors);
}
