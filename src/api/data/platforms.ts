import { SelectOption } from "../../common-utils";
import { PageResponse, fetchFromApi } from "../utils";

interface Platform {
    id: number;
    name: string;
}

const PATH = "/platforms/lists/parents";

const fetchPlatforms = (): Promise<Platform[]> =>
    fetchFromApi<PageResponse<Platform>>(PATH).then(
        (response) => response.results
    );

const convertPlatformToSelectOption = (platform: Platform): SelectOption => ({
    value: String(platform.id),
    label: platform.name,
});

export type { Platform };
export { fetchPlatforms, convertPlatformToSelectOption };
