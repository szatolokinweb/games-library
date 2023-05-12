import { makeObservable, observable, action } from "mobx";
import { Filter, getFilterFromSearchParams } from "./filter";

class Search {
    filter: Filter;

    constructor(searchParams: URLSearchParams) {
        makeObservable(this, {
            filter: observable,
            setFilter: action,
        });

        this.filter = getFilterFromSearchParams(searchParams);
    }

    setFilter(filter: Partial<Filter>) {
        this.filter = Object.assign(this.filter, filter);
    }
}

export { Search };
