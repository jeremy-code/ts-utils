const gcd = (a: number, b: number) => {
  if (!Number.isInteger(a)) {
    throw new Error("a is not an integer");
  }
  if (!Number.isInteger(b)) {
    throw new Error("b is not an integer");
  }

  if (b === 0) {
    return a;
  }

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
};

export { gcd };
