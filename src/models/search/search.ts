import { makeObservable, observable, action, computed, reaction } from "mobx";
import {
    Filter,
    INITIAL_FILTER,
    checkFiltersEqual,
    getFilterFromSearchParams,
    getSearchParamsFromFilter,
    validateFilter,
} from "./filter";
import { FilterData as FilterDataModel } from "../filter-data/filter-data";
import type { SetURLSearchParams } from "../../common-utils";

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

        reaction(
            () => Object.assign({}, this.filter),
            (filter) => {
                params.setSearchParams(getSearchParamsFromFilter(filter), {
                    replace: true,
                });
            }
        );

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
