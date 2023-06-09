import * as config from "../config";
import {
    SEARCH_PARAMS_SYMBOL,
    concatSearchParams,
} from "../utils/search-params";

interface PageResponse<T> {
    next: string | null;
    results: T[];
}

const BASE_SEARCH_PARAMS = new URLSearchParams({
    key: config.API_KEY,
});

const DEFAULT_PAGE_SIZE = 7;

const formatApiUrl = (
    path?: string,
    searchParams?: URLSearchParams
): string => {
    let url = config.API_ROOT_URL;

    if (path) {
        url += path;
    }

    const fullSearchParams = concatSearchParams([
        BASE_SEARCH_PARAMS,
        searchParams,
    ]);

    url += SEARCH_PARAMS_SYMBOL + fullSearchParams.toString();

    return url;
};

const fetchFromApi = async <T>(
    path?: string,
    searchParams?: URLSearchParams
): Promise<T> => {
    const response = await fetch(formatApiUrl(path, searchParams));
    const json = await response.json();

    return json;
};

export type { PageResponse };
export { DEFAULT_PAGE_SIZE, fetchFromApi };
