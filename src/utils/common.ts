const transformValueToError = (value: unknown): Error => {
    if (value instanceof Error) {
        return value;
    }

    return new Error(String(value));
};

const checkArraysEqual = (arr1: string[], arr2: string[]): boolean =>
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index]);

export { transformValueToError, checkArraysEqual };
