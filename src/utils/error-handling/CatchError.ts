/* eslint-disable no-unused-vars */
export const catchErrorAsync = <T, E extends new (...args: any[]) => Error>(
  promise: Promise<T>,
  ErrorInstance?: E[]
): Promise<[Error] | [undefined, T]> => {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((err) => {
      if (ErrorInstance === undefined) return [err];
      if (ErrorInstance.some((errorinstance) => err instanceof errorinstance))
        return [err];
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
    if (ErrorInstance.some((errorinstance) => err instanceof errorinstance))
      return [err as Error];
    if (err instanceof Error) return [err];
    throw err;
  }
};

export const tryAndThrow = async <Arg extends any[]>(
  fn: (...arg: Arg) => Promise<any>
): Promise<any> => {
  return async function (...arg: Arg) {
    return await fn(...arg)
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  };
};
