import { makeObservable } from "mobx";

class Search {
    constructor(searchParams: URLSearchParams) {
        makeObservable(this, {});
    }
}

export { Search };
