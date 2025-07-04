/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */

export const catchErrorAsync = <T, E extends new (...args: any[]) => Error>(
  promise: Promise<T>,
  ErrorInstance?: E[]
): Promise<[Error] | [undefined, T]> => {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((err: unknown) => { 
      if (ErrorInstance === undefined) return [err instanceof Error ? err : new Error(String(err))];
      if (ErrorInstance.some((errorinstance) => err instanceof errorinstance))
        return [err instanceof Error ? err : new Error(String(err))];
      if (err instanceof Error) return [err];
      throw err;
    });
};

export const catchError = <T, E extends new (...args: any[]) => Error>(
  fn: () => T,
  ErrorInstance?: E[]
): [Error] | [undefined, T] => {
  try {
    return [undefined, fn()];
  } catch (err) {
    if (ErrorInstance === undefined) return [err as Error];
    if (ErrorInstance.some((errorinstance) => err instanceof errorinstance)) return [err as Error];
    if (err instanceof Error) return [err];
    throw err;
  }
};
