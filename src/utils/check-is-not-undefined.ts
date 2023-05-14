const checkIsNotUndefined = <T>(value: T): value is Exclude<T, undefined> =>
    typeof value !== "undefined";

export { checkIsNotUndefined };
