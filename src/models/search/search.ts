import {
    makeObservable,
    observable,
    action,
    observe,
    computed,
    reaction,
} from "mobx";
import type { useSearchParams } from "react-router-dom";
import {
    Filter,
    INITIAL_FILTER,
    checkFiltersEqual,
    getFilterFromSearchParams,
    getSearchParamsFromFilter,
    validateFilter,
} from "./filter";
import { FilterData as FilterDataModel } from "../filter-data/filter-data";

type SetURLSearchParams = ReturnType<typeof useSearchParams>[1];

class Search {
    filter: Filter;

    filterDataModel: FilterDataModel;

    constructor(params: {
        searchParams: URLSearchParams;
        setSearchParams: SetURLSearchParams;
    }) {
        makeObservable(this, {
            filter: observable,
            isInitialFilter: computed,
            setFilter: action,
            resetFilter: action,
        });

        this.filter = getFilterFromSearchParams(params.searchParams);

        observe(this.filter, () => {
            params.setSearchParams(getSearchParamsFromFilter(this.filter), {
                replace: true,
            });
        });

        this.filterDataModel = new FilterDataModel();

        this.filterDataModel.load();

        reaction(
            () => this.filterDataModel.data,
            (filterData) => {
                if (filterData) {
                    this.setFilter(validateFilter(this.filter, filterData));
                }
            }
        );
    }

    get isInitialFilter(): boolean {
        return checkFiltersEqual(this.filter, INITIAL_FILTER);
    }

    setFilter(filter: Partial<Filter>) {
        Object.assign(this.filter, filter);
    }

    resetFilter() {
        Object.assign(this.filter, INITIAL_FILTER);
    }
}

export { Search };
