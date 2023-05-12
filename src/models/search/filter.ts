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

export type { Filter };
export { getFilterFromSearchParams };
