interface Filter {
    title: string;
    genres: string[];
    platforms: string[];
    stores: string[];
    isInverted: boolean;
    ordering?: string;
}

const SEPARATOR = ",";

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
        append("isInverted", String(isInverted));
    }

    return searchParams;
};

export type { Filter };
export { getFilterFromSearchParams, getSearchParamsFromFilter };
