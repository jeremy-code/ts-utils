import { chunk, chunk1 } from "./chunk";

describe.each([
  ["chunk", chunk],
  ["chunk1", chunk1],
])("%s function", (_, chunkFn) => {
  it.each([
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      3,
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    ],
    [[1, 2, 3, 4, 5], 2, [[1, 2], [3, 4], [5]]],
    [[1, 2, 3], 4, [[1, 2, 3]]],
    [[1, 2, 3], 1, [[1], [2], [3]]],
  ])("should chunk %j into subarrays of size %i", (input, size, expected) => {
    expect(chunkFn(input, size)).toEqual(expected);
  });

  it("chunks arrays of strings", () => {
    expect(chunkFn(["a", "b", "c", "d"], 2)).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  it("should not mutate the original array", () => {
    const input = [1, 2, 3, 4, 5];
    chunkFn(input, 2);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });
});
