const isBrowser = typeof window === "object" && typeof document === "object";

const isNode =
  typeof process === "object" &&
  process.title === "node" &&
  process.release.name === "node";

const runtime =
  globalThis.process?.release?.name === "node" ? "node" : "browser";
