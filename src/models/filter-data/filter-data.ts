import { makeObservable, observable, action, runInAction } from "mobx";
import { transformValueToError } from "../../utils/common";
import { Genre, fetchGenres } from "../../api/data/genres";
import { Platform, fetchPlatforms } from "../../api/data/platforms";
import { Store, fetchStores } from "../../api/data/stores";

interface Data {
    genres: Genre[];
    platforms: Platform[];
    stores: Store[];
}

class FilterData {
    data?: Data;

    isLoading: boolean;
    error?: Error;

    constructor() {
        makeObservable(this, {
            data: observable,
            isLoading: observable,
            error: observable,
            load: action,
        });

        this.isLoading = false;
    }

    async load() {
        this.isLoading = true;

        try {
            const [genres, platforms, stores] = await Promise.all([
                fetchGenres(),
                fetchPlatforms(),
                fetchStores(),
            ]);

            runInAction(() => {
                this.data = {
                    genres,
                    platforms,
                    stores,
                };
                this.error = undefined;
            });
        } catch (error) {
            runInAction(() => (this.error = transformValueToError(error)));
        } finally {
            runInAction(() => (this.isLoading = false));
        }
    }
}

export type { Data };
export { FilterData };
