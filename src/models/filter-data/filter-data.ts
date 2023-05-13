import { makeObservable, observable, action, runInAction } from "mobx";
import { transformValueToError } from "../../common-utils";
import { Genre, fetchGenres } from "../../api/data/genres";

interface Data {
    genres: Genre[];
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
            const [genres] = await Promise.all([
                fetchGenres(),
                Promise.resolve(),
                Promise.resolve(),
            ]);

            runInAction(() => {
                this.data = {
                    genres,
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

export { FilterData };
