import { omit, omit1, pick } from "./pick";

describe("pick", () => {
  test("should pick specified properties from an object", () => {
    const obj = { name: "John", age: 30, city: "New York" };
    const result = pick(obj, ["name", "city"]);
    expect(result).toEqual({ name: "John", city: "New York" });
    expect(result).not.toHaveProperty("age");
  });

  test("should return an empty object if no keys are specified", () => {
    const obj = { name: "John", age: 30, city: "New York" };
    const result = pick(obj, []);
    expect(result).toEqual({});
  });

  test("should ignore keys that do not exist in the object", () => {
    const obj = { name: "John", age: 30 } as {
      name: string;
      age: number;
      height: number;
    };
    const result = pick(obj, ["name", "height"]);
    expect(result).toEqual({ name: "John" });
    expect(result).toHaveProperty("name");
  });
});

describe("omit", () => {
  test("should omit specified properties from an object", () => {
    const obj = { name: "John", age: 30, city: "New York" };
    const result = omit(obj, ["age"]);
    expect(result).toEqual({ name: "John", city: "New York" });
  });

  test("should return the original object if no keys are specified to be omitted", () => {
    const obj = { name: "John", age: 30 };
    const result = omit(obj, []);
    expect(result).toEqual(obj);
  });
});

describe("omit1", () => {
  test("should omit specified properties using immutable approach", () => {
    const obj = { name: "John", age: 30, city: "New York" };
    const result = omit1(obj, ["age"]);
    expect(result).toEqual({ name: "John", city: "New York" });
  });

  test("should return the original object if no keys are specified to be omitted", () => {
    const obj = { name: "John", age: 30 };
    const result = omit1(obj, []);
    expect(result).toEqual(obj);
  });
});
