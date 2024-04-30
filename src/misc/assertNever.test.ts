import { assertNever } from "./assertNever";

test("assertNever", () => {
  expect(() => {
    assertNever("foo" as never);
  }).toThrow('Unexpected value: "foo"');
});
