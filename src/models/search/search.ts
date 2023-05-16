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
import {
    Game,
    fetchGamesPage,
    getSearchParamsFromFilter as getGamesSearchParamsFromFilter,
} from "../../api/data/games";
import { tryLoadImages } from "../../utils/try-load-images";
import { checkIsNotUndefined } from "../../utils/check-is-not-undefined";

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
                params.setSearchParams(getSearchParamsFromFilter(filter), {
                    replace: true,
                });

                this.games = new FetchableList(async (pageSearchParams) => {
                    const pageResponse = await fetchGamesPage(
                        concatSearchParams([
                            pageSearchParams,
                            getGamesSearchParamsFromFilter(filter),
                        ])
                    );

                    await tryLoadImages(
                        pageResponse.results
                            .map((game) => game.background_image)
                            .filter(checkIsNotUndefined)
                    );

                    return pageResponse;
                });
            }
        );

        reaction(
            () => this.games,
            (games) => {
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
