import { makeObservable, observable, action, runInAction } from "mobx";
import { transformValueToError } from "../../common-utils";

interface Data {}

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
                Promise.resolve(),
                Promise.resolve(),
                Promise.resolve(),
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

export { FilterData };
