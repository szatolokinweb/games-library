import { makeObservable, observable, action, observe } from "mobx";
import type { useSearchParams } from "react-router-dom";
import {
    Filter,
    getFilterFromSearchParams,
    getSearchParamsFromFilter,
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
            setFilter: action,
        });

        this.filter = getFilterFromSearchParams(params.searchParams);

        observe(this.filter, () => {
            params.setSearchParams(getSearchParamsFromFilter(this.filter), {
                replace: true,
            });
        });

        this.filterDataModel = new FilterDataModel();

        this.filterDataModel.load();
    }

    setFilter(filter: Partial<Filter>) {
        this.filter = Object.assign(this.filter, filter);
    }
}

export { Search };
