import { segment, segmentByWord } from "./segment";

describe("segment function", () => {
  test("segment a sentence by graphemes", () => {
    const input = "abc def";
    const segments = segment(input);
    expect(segments).toHaveLength(input.length);
    expect(segments).toHaveLength(7);
    expect(segments).toEqual(["a", "b", "c", " ", "d", "e", "f"]);
  });

  test("segment an emoji by graphemes", () => {
    // input.length === 4, but it's a single emoji
    const input = "🇬🇧";
    const segments = segment(input);
    expect(segments).toHaveLength(1);
    expect(segments).toEqual(["🇬🇧"]);
  });

  // hindi script can combine multiple characters into a single grapheme
  test("segment a word in Hindi", () => {
    // input.length === 8
    const input = "अनुच्छेद";
    const segments = segment(input, "hi");
    expect(segments).toHaveLength(4);
    expect(segments).toEqual(["अ", "नु", "च्छे", "द"]);
  });

  test("segment a sentence by words", () => {
    const input = "Hello, world!";
    const segments = segment(input, undefined, { granularity: "word" });
    expect(segments).toHaveLength(5);
    expect(segments).toEqual(["Hello", ",", " ", "world", "!"]);
  });
});

describe("segmentByWord function", () => {
  test("segment a sentence by words", () => {
    const input = "Hello, world!";
    const segments = segmentByWord(input);
    expect(segments).toHaveLength(2);
    expect(segments).toEqual(["Hello", "world"]);
  });

  // making sure it filters out puncutation
  test("segment a sentence by words in Spanish", () => {
    const input = "¡Hola, mundo!";
    const segments = segmentByWord(input, "es");
    expect(segments).toHaveLength(2);
    expect(segments).toEqual(["Hola", "mundo"]);
  });
});
