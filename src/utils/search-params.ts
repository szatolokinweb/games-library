import type { useSearchParams } from "react-router-dom";

type SetURLSearchParams = ReturnType<typeof useSearchParams>[1];

const SEARCH_PARAMS_SYMBOL = "?";

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

export type { SetURLSearchParams };
export { SEARCH_PARAMS_SYMBOL, concatSearchParams };
