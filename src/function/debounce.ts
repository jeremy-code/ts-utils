export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  ms?: number,
  immediate?: boolean
) {
  let timeoutId: NodeJS.Timeout | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const later = () => {
      timeoutId = undefined;
      if (!immediate) callback.apply(this, args);
    };

    const callNow = immediate && timeoutId === undefined;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, ms);

    if (callNow) callback.apply(this, args);
  };
}
