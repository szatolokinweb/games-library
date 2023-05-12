import { makeObservable, observable, toJS } from "mobx";
import { Filter, getFilterFromSearchParams } from "./filter";

class Search {
    filter: Filter;

    constructor(searchParams: URLSearchParams) {
        makeObservable(this, {
            filter: observable,
        });

        this.filter = getFilterFromSearchParams(searchParams);
    }
}

export { Search };
