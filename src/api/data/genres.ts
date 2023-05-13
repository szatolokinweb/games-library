import { PageResponse, fetchFromApi } from "../utils";

interface Genre {
    id: number;
    name: string;
}

const PATH = "/genres";

const fetchGenres = (): Promise<Genre[]> =>
    fetchFromApi<PageResponse<Genre>>(PATH).then(
        (response) => response.results
    );

export type { Genre };
export { fetchGenres };
