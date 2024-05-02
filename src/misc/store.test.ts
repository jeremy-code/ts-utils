import { createStore } from "./store";

describe("createStore", () => {
  test("initializes with an object", () => {
    const store = createStore({ count: 0 });
    expect(store.getSnapshot()).toEqual({ count: 0 });
  });

  test("initializes with a function", () => {
    const initialState = () => ({ count: 1 });
    const store = createStore(initialState);
    expect(store.getSnapshot()).toEqual({ count: 1 });
  });

  test("updates the state and notifies listeners", () => {
    const store = createStore({ count: 0 });
    const listener = jest.fn();
    store.subscribe(listener);
    store.update({ count: 1 });
    expect(store.getSnapshot()).toEqual({ count: 1 });
    expect(listener).toHaveBeenCalled();
  });

  test("removes listeners correctly", () => {
    const store = createStore({ count: 0 });
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.update({ count: 1 });
    expect(listener).not.toHaveBeenCalled();
  });
});
