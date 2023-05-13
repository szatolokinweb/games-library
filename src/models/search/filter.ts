import { checkArraysEqual } from "../../utils/common";
import { Data as FilterData } from "../filter-data/filter-data";

interface Filter {
    title: string;
    genres: string[];
    platforms: string[];
    stores: string[];
    isInverted: boolean;
    ordering?: string;
}

const SEPARATOR = ",";

const INITIAL_FILTER: Filter = {
    title: "",
    genres: [],
    platforms: [],
    stores: [],
    isInverted: false,
    ordering: undefined,
};

const getFilterFromSearchParams = (searchParams: URLSearchParams): Filter => {
    const get = (key: keyof Filter) => searchParams.get(key);

    return {
        title: get("title") ?? "",
        genres: get("genres")?.split(SEPARATOR) ?? [],
        platforms: get("platforms")?.split(SEPARATOR) ?? [],
        stores: get("stores")?.split(SEPARATOR) ?? [],
        isInverted: get("isInverted") === "true",
        ordering: get("ordering") ?? undefined,
    };
};

const getSearchParamsFromFilter = ({
    title,
    genres,
    platforms,
    stores,
    isInverted,
    ordering,
}: Filter): URLSearchParams => {
    const searchParams = new URLSearchParams();

    const append = (key: keyof Filter, value: string) =>
        searchParams.append(key, value);

    if (title) {
        append("title", title);
    }

    if (genres.length > 0) {
        append("genres", genres.join(SEPARATOR));
    }

    if (platforms.length > 0) {
        append("platforms", platforms.join(SEPARATOR));
    }

    if (stores.length > 0) {
        append("stores", stores.join(SEPARATOR));
    }

    if (isInverted) {
        append("isInverted", String(isInverted));
    }

    if (ordering) {
        append("ordering", String(ordering));
    }

    return searchParams;
};

const checkFiltersEqual = (filter1: Filter, filter2: Filter): boolean =>
    filter1.title === filter2.title &&
    checkArraysEqual(filter1.genres, filter2.genres) &&
    checkArraysEqual(filter1.platforms, filter2.platforms) &&
    checkArraysEqual(filter1.stores, filter2.stores) &&
    filter1.isInverted === filter2.isInverted &&
    filter1.ordering === filter2.ordering;

const validateFilter = (
    filter: Filter,
    filterData: FilterData
): Partial<Filter> => ({
    genres: filter.genres.filter((genreId) =>
        filterData.genres.find((genre) => String(genre.id) === genreId)
    ),
    platforms: filter.platforms.filter((platformId) =>
        filterData.platforms.find(
            (platform) => String(platform.id) === platformId
        )
    ),
    stores: filter.stores.filter((storeId) =>
        filterData.stores.find((store) => String(store.id) === storeId)
    ),
});

export type { Filter };
export {
    INITIAL_FILTER,
    SEPARATOR,
    getFilterFromSearchParams,
    getSearchParamsFromFilter,
    checkFiltersEqual,
    validateFilter,
};
