import { STATUS_CODES } from "node:http";

import { mapStatusCode } from "./mapStatusCode";

describe("mapStatusCode function", () => {
  describe("should return 500 error on invalid status code", () => {
    it.each([0, "000", 600])("should not throw for %s", (statusCode) => {
      expect(mapStatusCode(statusCode)).toStrictEqual({
        ok: false,
        status: 500,
        statusText: STATUS_CODES[500], // "Internal Server Error"
        statusClass: "SERVER_ERROR",
      });
    });
  });

  describe("should return valid status object for number", () => {
    it.each([
      [
        100,
        {
          ok: false,
          status: 100,
          statusText: "Continue",
          statusClass: "INFORMATIONAL",
        },
      ],
      [
        200,
        { ok: true, status: 200, statusText: "OK", statusClass: "SUCCESSFUL" },
      ],
      [
        300,
        {
          ok: false,
          status: 300,
          statusText: "Multiple Choices",
          statusClass: "REDIRECTION",
        },
      ],
      [
        400,
        {
          ok: false,
          status: 400,
          statusText: "Bad Request",
          statusClass: "CLIENT_ERROR",
        },
      ],
      [
        500,
        {
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
          statusClass: "SERVER_ERROR",
        },
      ],
    ])("should return status object for %s", (statusCode, expectedStatus) => {
      expect(mapStatusCode(statusCode)).toStrictEqual(expectedStatus);
    });
  });

  describe("should return valid status object for string", () => {
    it.each([
      [
        "100",
        {
          ok: false,
          status: 100,
          statusText: "Continue",
          statusClass: "INFORMATIONAL",
        },
      ],

      [
        "200",
        { ok: true, status: 200, statusText: "OK", statusClass: "SUCCESSFUL" },
      ],
      [
        "300",
        {
          ok: false,
          status: 300,
          statusText: "Multiple Choices",
          statusClass: "REDIRECTION",
        },
      ],
      [
        "400",
        {
          ok: false,
          status: 400,
          statusText: "Bad Request",
          statusClass: "CLIENT_ERROR",
        },
      ],
      [
        "500",
        {
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
          statusClass: "SERVER_ERROR",
        },
      ],
    ])("should return status object for %s", (statusCode, expectedStatus) => {
      expect(mapStatusCode(statusCode)).toStrictEqual(expectedStatus);
    });
  });
});
