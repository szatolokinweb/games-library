import { Filter, SEPARATOR } from "../../models/search/filter";
import { PageResponse, fetchFromApi } from "../utils";

interface Game {
    id: number;
    name: string;
    background_image: string;
}

type SearchProperty =
    | "search"
    | "parent_platforms"
    | "stores"
    | "genres"
    | "ordering";

const PATH = "/games";

const ORDERING_INVERT_SYMBOL = "-";

const fetchGamesPage = (
    searchParams: URLSearchParams
): Promise<PageResponse<Game>> => fetchFromApi(PATH, searchParams);

const getSearchParamsFromFilter = ({
    title,
    genres,
    platforms,
    stores,
    isInverted,
    ordering,
}: Filter): URLSearchParams => {
    const searchParams = new URLSearchParams();

    const append = (key: SearchProperty, value: string) =>
        searchParams.append(key, value);

    if (title) {
        append("search", title);
    }

    if (genres.length > 0) {
        append("genres", genres.join(SEPARATOR));
    }

    if (platforms.length > 0) {
        append("parent_platforms", platforms.join(SEPARATOR));
    }

    if (stores.length > 0) {
        append("stores", stores.join(SEPARATOR));
    }

    if (ordering) {
        if (isInverted) {
            append("ordering", ORDERING_INVERT_SYMBOL + ordering);
        } else {
            append("ordering", ordering);
        }
    }

    return searchParams;
};

export type { Game };
export { fetchGamesPage, getSearchParamsFromFilter };
