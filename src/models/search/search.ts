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
import {
    type SetURLSearchParams,
    concatSearchParams,
} from "../../utils/search-params";
import { FetchableList } from "../fetchable-list/fetchable-list";
import { Game, fetchGamesPage } from "../../api/data/games";

class Search {
    filter: Filter;

    filterDataModel: FilterDataModel;

    games?: FetchableList<Game>;

    constructor(params: {
        searchParams: URLSearchParams;
        setSearchParams: SetURLSearchParams;
    }) {
        makeObservable(this, {
            filter: observable,
            games: observable,
            isInitialFilter: computed,
            setFilter: action,
            resetFilter: action,
        });

        this.filter = getFilterFromSearchParams(params.searchParams);

        reaction(
            () => Object.assign({}, this.filter),
            (filter) => {
                console.log("update filter");

                params.setSearchParams(getSearchParamsFromFilter(filter), {
                    replace: true,
                });

                this.games = new FetchableList((pageSearchParams) =>
                    fetchGamesPage(concatSearchParams([pageSearchParams]))
                );
            }
        );

        reaction(
            () => this.games,
            (games) => {
                console.log("update games");

                if (games) {
                    games.fetchNextPage();
                }
            }
        );

        this.filterDataModel = new FilterDataModel();

        this.filterDataModel.load();

        reaction(
            () => this.filterDataModel.data,
            (filterData) => {
                console.log("load filter data");

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
