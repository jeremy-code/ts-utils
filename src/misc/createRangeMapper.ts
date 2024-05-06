type Range = [start: number, end: number];

export const createRangeMapper = <T extends PropertyKey>(
  map: Record<T, Range>,
) => {
  return (value: number) => {
    const entry = Object.entries<Range>(map).find(
      ([, [start, end]], i) =>
        i === 0 ?
          // Inclusive of start and end on first entry (e.g. on A: [90, 100], 100 would be an A)
          value >= start && value <= end
        : start <= value && value < end, // exclusive of end on subsequent entries
    );

    if (!entry) {
      throw new RangeError(
        `Invalid value with no corresponding range: ${value}`,
        {
          cause: { map, value },
        },
      );
    }

    return entry[0] as T;
  };
};
