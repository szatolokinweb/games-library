const SEARCH_PARAMS_SYMBOL = "?";

const transformValueToError = (value: unknown): Error => {
    if (value instanceof Error) {
        return value;
    }

    return new Error(String(value));
};

const concatSearchParams = (
    searchParamsList: (URLSearchParams | undefined)[]
): URLSearchParams =>
    new URLSearchParams(
        searchParamsList.reduce(
            (acc, searchParams) =>
                Object.assign(
                    acc,
                    searchParams && Object.fromEntries(searchParams)
                ),
            {}
        )
    );

const checkArraysEqual = (arr1: string[], arr2: string[]): boolean =>
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index]);

export {
    SEARCH_PARAMS_SYMBOL,
    transformValueToError,
    concatSearchParams,
    checkArraysEqual,
};
