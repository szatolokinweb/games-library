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

export { SEARCH_PARAMS_SYMBOL, transformValueToError, concatSearchParams };
