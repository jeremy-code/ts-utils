import { describe, expect, test, vitest } from "vitest";

import { sleep } from "./sleep";

describe("sleep", () => {
  vitest.useFakeTimers();

  test("resolves after the specified time", async () => {
    const ms = 500;
    const start = Date.now();

    const sleepPromise = sleep(ms);

    vitest.advanceTimersByTime(ms);

    await sleepPromise;

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(ms);
  });

  test("resolves immediately if no time is specified", async () => {
    const start = Date.now();

    const sleepPromise = sleep();

    vitest.advanceTimersByTime(0);

    await sleepPromise;

    expect(Date.now() - start).toBeGreaterThanOrEqual(0);
  });
});
