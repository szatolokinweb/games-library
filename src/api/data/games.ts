import { PageResponse, fetchFromApi } from "../utils";

interface Game {
    id: number;
    name: string;
}

const PATH = "/games";

const fetchGamesPage = (
    searchParams: URLSearchParams
): Promise<PageResponse<Game>> => fetchFromApi(PATH, searchParams);

export type { Game };
export { fetchGamesPage };
