import { sleep } from "./sleep";

describe("sleep", () => {
  jest.useFakeTimers();

  it("resolves after the specified time", async () => {
    const ms = 500;
    const start = Date.now();

    const sleepPromise = sleep(ms);

    jest.advanceTimersByTime(ms);

    await sleepPromise;

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(ms);
  });

  it("resolves immediately if no time is specified", async () => {
    const start = Date.now();

    const sleepPromise = sleep();

    jest.advanceTimersByTime(0);

    await sleepPromise;

    expect(Date.now() - start).toBeGreaterThanOrEqual(0);
  });
});
