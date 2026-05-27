import type { Mock } from "vitest";

import { debounce } from "./debounce";

describe("debounce", () => {
  let functionToDebounce: Mock;

  beforeEach(() => {
    vitest.useFakeTimers();
    functionToDebounce = vitest.fn();
  });

  it("delays execution", () => {
    const debouncedFunction = debounce(functionToDebounce, 1000);
    debouncedFunction();
    expect(functionToDebounce).not.toHaveBeenCalled();
    vitest.runAllTimers();
    expect(functionToDebounce).toHaveBeenCalledTimes(1);
  });

  it("only executes once within the delay period", () => {
    const debouncedFunction = debounce(functionToDebounce, 1000);
    debouncedFunction();
    debouncedFunction();
    vitest.runAllTimers();
    expect(functionToDebounce).toHaveBeenCalledTimes(1);
  });

  it("handles immediate execution", () => {
    const debouncedFunction = debounce(functionToDebounce, 1000, true);
    debouncedFunction();
    expect(functionToDebounce).toHaveBeenCalledTimes(1);
    vitest.runAllTimers();
    expect(functionToDebounce).toHaveBeenCalledTimes(1); // Still once because of immediate flag
  });

  it("properly passes parameters", () => {
    const debouncedFunction = debounce(functionToDebounce, 1000);
    const args = ["arg1", 2, true];
    debouncedFunction(...args);
    vitest.runAllTimers();
    expect(functionToDebounce).toHaveBeenCalledWith(...args);
  });

  it("binds the correct `this` context", () => {
    const context = { value: 42 };
    const debouncedFunction = debounce(functionToDebounce.bind(context), 1000);
    debouncedFunction();
    vitest.runAllTimers();
    expect(functionToDebounce).toHaveBeenLastCalledWith();
    expect(functionToDebounce.mock.instances[0]).toBe(context);
  });
});
