import type { SelectOption } from "../../utils/select";
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

const convertGenreToSelectOption = (genre: Genre): SelectOption => ({
    value: String(genre.id),
    label: genre.name,
});

export type { Genre };
export { fetchGenres, convertGenreToSelectOption };
