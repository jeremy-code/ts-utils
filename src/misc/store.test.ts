import { createStore } from "./store";

describe("createStore function", () => {
  it("initializes with an object", () => {
    const store = createStore({ count: 0 });
    expect(store.getSnapshot()).toEqual({ count: 0 });
  });

  it("initializes with a function", () => {
    const initialState = () => ({ count: 1 });
    const store = createStore(initialState);
    expect(store.getSnapshot()).toEqual({ count: 1 });
  });

  it("updates the state and notifies listeners", () => {
    const store = createStore({ count: 0 });
    const listener = jest.fn();
    store.subscribe(listener);
    store.update({ count: 1 });
    expect(store.getSnapshot()).toEqual({ count: 1 });
    expect(listener).toHaveBeenCalled();
  });

  it("removes listeners correctly", () => {
    const store = createStore({ count: 0 });
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.update({ count: 1 });
    expect(listener).not.toHaveBeenCalled();
  });
});
