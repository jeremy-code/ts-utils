import { throttle } from "./throttle";

describe("throttle", () => {
  jest.useFakeTimers();

  it("throttles calls correctly", () => {
    const callback = jest.fn();
    const throttledFunc = throttle(callback, 1000);
    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(1);

    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("immediate invocation", () => {
    const callback = jest.fn();
    const throttledFunc = throttle(callback, 1000, true);

    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(1);

    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    throttledFunc();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("passes arguments and maintains context", () => {
    const context = { value: 42 };
    const callback = jest.fn(function (this: { value: number }, arg) {
      expect(this.value).toBe(42);
      expect(arg).toBe("test");
    });
    const throttledFunc = throttle(callback.bind(context), 1000);

    throttledFunc("test");
    expect(callback).toHaveBeenCalledWith("test");
  });
});
