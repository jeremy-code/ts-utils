export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  ms: number,
  immediate?: boolean,
) {
  let lastTime = immediate ? -ms : 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= ms) {
      callback(...args);
      lastTime = now;
    }
  };
}
