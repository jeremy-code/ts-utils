import { throttle } from "./throttle";

describe("throttle", () => {
  jest.useFakeTimers();

  test("throttles calls correctly", () => {
    const callback = jest.fn();
    const throttledFunc = throttle(callback, 1000);
    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(1);

    // Simulate a fast second call
    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(1); // Still 1, because of throttling

    // Simulate time passing
    jest.advanceTimersByTime(1000);
    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(2); // Now it should have been called again
  });

  test("immediate invocation", () => {
    const callback = jest.fn();
    const throttledFunc = throttle(callback, 1000, true);

    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(1);

    // Since immediate is true, we expect the first call to happen immediately
    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(1); // Still 1 due to throttling

    jest.advanceTimersByTime(1000);
    // After the specified time, it should be callable again
    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("passes arguments and maintains context", () => {
    const context = { value: 42 };
    const callback = jest.fn(function (this: { value: number }, arg) {
      expect(this.value).toBe(42);
      expect(arg).toBe("test");
    });
    const throttledFunc = throttle(callback.bind(context), 1000);

    throttledFunc("test");
    expect(callback).toHaveBeenCalledWith("test");
  });

  // Restore the real timers in case other tests need them
  afterAll(() => {
    jest.useRealTimers();
  });
});
