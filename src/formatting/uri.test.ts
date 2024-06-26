import { uri } from "./uri";

describe("uri function", () => {
  it("interpolates and encodes string values", () => {
    const result = uri`/api/resource?name=${"John Doe"}&active=${true}`;
    expect(result).toBe("/api/resource?name=John%20Doe&active=true");
  });

  it("correctly handles number and boolean values", () => {
    const result = uri`/api/item?id=${123}&available=${false}`;
    expect(result).toBe("/api/item?id=123&available=false");
  });

  it("encodes special characters in values", () => {
    const result = uri`/search?q=${"special & characters?/="}`;
    expect(result).toBe("/search?q=special%20%26%20characters%3F%2F%3D");
  });

  it("processes template without any interpolation values", () => {
    const result = uri`/static/path`;
    expect(result).toBe("/static/path");
  });

  it("decodes encoded values", () => {
    const result = uri`/api/resource?name=${"John Doe"}&active=${true}`;
    expect(result).toBe("/api/resource?name=John%20Doe&active=true");

    const decoded = decodeURI(result);
    expect(decoded).toBe("/api/resource?name=John Doe&active=true");
  });
});
