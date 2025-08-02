export function buildRangeFilter<T extends string>(
  field: T,
  min?: number,
  max?: number
): Partial<Record<T, { gte?: number; lte?: number }>> | {} {
  if (min === undefined && max === undefined) return {};

  return {
    [field]: {
      ...(min !== undefined && { gte: min }),
      ...(max !== undefined && { lte: max }),
    },
  } as Partial<Record<T, { gte?: number; lte?: number }>>;
}
