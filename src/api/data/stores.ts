import type { SelectOption } from "../../utils/select";
import { PageResponse, fetchFromApi } from "../utils";

interface Store {
    id: number;
    name: string;
}

const PATH = "/stores";

const fetchStores = (): Promise<Store[]> =>
    fetchFromApi<PageResponse<Store>>(PATH).then(
        (response) => response.results
    );

const convertStoreToSelectOption = (store: Store): SelectOption => ({
    value: String(store.id),
    label: store.name,
});

export type { Store };
export { fetchStores, convertStoreToSelectOption };
