import { mapReplacer, mapReviver } from "./jsonStringifyMap";

describe("mapReplacer and mapReviver", () => {
  test("Properly serializes and deserializes a Map", () => {
    const map = new Map([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);

    const mapString = JSON.stringify(map, mapReplacer);

    const mapCopy = JSON.parse(mapString, mapReviver) as Map<number, string>;

    expect(mapCopy).toBeInstanceOf(Map);
    expect(Array.from(mapCopy)).toEqual(Array.from(map));
    expect(mapCopy).not.toBe(map);
  });

  test("Handles non-Map values", () => {
    const nonMap = { a: 1, b: 2, c: 3 };

    const nonMapString = JSON.stringify(nonMap, mapReplacer);

    const nonMapCopy = JSON.parse(nonMapString, mapReviver) as typeof nonMap;

    expect(nonMapCopy).toEqual(nonMap);
  });

  test("Handles non-ObjectifiedMap values", () => {
    const nonObjectifiedMap = { type: "Map", value: "not an array" };

    const badMapString = JSON.stringify(nonObjectifiedMap, mapReplacer);

    const badMapCopy = JSON.parse(
      badMapString,
      mapReviver,
    ) as typeof nonObjectifiedMap;

    expect(badMapCopy).toEqual({ type: "Map", value: "not an array" });
  });

  test("Handles nested Maps", () => {
    const map = new Map<number, string | Map<number, string>>([
      [
        1,
        new Map([
          [2, "two"],
          [3, "three"],
        ]),
      ],
      [4, "four"],
    ]);

    const mapString = JSON.stringify(map, mapReplacer);

    const mapCopy = JSON.parse(mapString, mapReviver) as typeof map;

    expect(mapCopy).toBeInstanceOf(Map);
    expect(Array.from(mapCopy)).toEqual(Array.from(map));
    expect(mapCopy.get(1)).toBeInstanceOf(Map);
    expect(Array.from(mapCopy.get(1) as Map<number, string>)).toEqual([
      [2, "two"],
      [3, "three"],
    ]);
    expect(mapCopy.get(4)).toBe("four");
  });
});
