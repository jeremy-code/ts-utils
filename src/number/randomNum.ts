// random number between min and max (inclusive)
export const randomNum = (min: number, max: number) =>
  Math.floor(
    Math.random() *
      // remove + 1 to make the max exclusive
      (Math.floor(max) - Math.ceil(min) + 1) +
      Math.ceil(min),
  );
