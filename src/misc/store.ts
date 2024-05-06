/**
 * Intended for use in React with `useSyncExternalStore()`. For more complex use
 * cases, see a library like Zustand.
 *
 * A start for a simple store implementation. Notably, it wouldn't actually work
 * by itself. Since the state is mutated instead of replaced, React would never
 * re-render, since it passes Object.is equality due to having same reference.
 */
export function createStore<S>(initialState: S | (() => S)) {
  // Matches useState's behavior
  let state =
    typeof initialState === "function" ?
      (initialState as () => S)()
    : initialState;
  const listeners = new Set<() => void>();

  // Using an object with methods. Class may be more appropriate.
  return {
    getSnapshot: () => state,
    subscribe: (onStoreChange: () => void) => {
      listeners.add(onStoreChange);

      return () => listeners.delete(onStoreChange);
    },
    update: (newState: Partial<S>) => {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener());
    },
  };
}

// Would have to be initialized somewhere to be used:
export const store = createStore({ count: 0 });
