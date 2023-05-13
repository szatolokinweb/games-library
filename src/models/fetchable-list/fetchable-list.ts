import { makeObservable, observable, action, runInAction } from "mobx";
import { PageResponse } from "../../api/utils";
import { DEFAULT_PAGE_SIZE, transformValueToError } from "../../common-utils";

type FetchPage<T> = (
    pageSearchParams: URLSearchParams
) => Promise<PageResponse<T>>;

const formatPageSearchParams = (
    pageSize?: number,
    page?: number
): URLSearchParams => {
    const pageSearchParams = new URLSearchParams();

    if (pageSize) {
        pageSearchParams.append("page_size", String(pageSize));
    }

    if (page) {
        pageSearchParams.append("page", String(page));
    }

    return pageSearchParams;
};

class FetchableList<T> {
    list: T[];
    isLoading: boolean;
    error?: Error;
    isFullyLoaded: boolean;
    page: number;

    readonly PAGE_SIZE: number;

    private readonly _fetchPage: FetchPage<T>;

    constructor(fetchPage: FetchPage<T>, pageSize: number = DEFAULT_PAGE_SIZE) {
        makeObservable(this, {
            list: observable,
            isLoading: observable,
            error: observable,
            isFullyLoaded: observable,
            page: observable,
            fetchNextPage: action,
        });

        this.list = [];
        this.isLoading = false;
        this.isFullyLoaded = false;
        this.page = 0;

        this.PAGE_SIZE = pageSize;

        this._fetchPage = fetchPage;
    }

    async fetchNextPage() {
        this.isLoading = true;

        try {
            const nextPage = this.page + 1;

            const response = await this._fetchPage(
                formatPageSearchParams(this.PAGE_SIZE, nextPage)
            );

            runInAction(() => {
                this.list = this.list.concat(response.results);
                this.error = undefined;
                this.page = nextPage;

                if (!response.next) {
                    this.isFullyLoaded = true;
                }
            });
        } catch (error) {
            runInAction(() => {
                this.error = transformValueToError(error);
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}

export { FetchableList };
