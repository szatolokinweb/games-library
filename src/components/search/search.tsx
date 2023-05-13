import "./search.css";

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Search as SearchModel } from "../../models/search/search";
import { Filter } from "../filter/filter";
import { Games } from "../games/games";

const Search: React.FC = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchModel = useMemo(
        () => new SearchModel({ searchParams, setSearchParams }),
        []
    );

    const filterDataModel = searchModel.filterDataModel;

    if (filterDataModel.error) {
        return (
            <div className="search">
                <h1>error filter data</h1>
                <Button onClick={() => searchModel.filterDataModel.load()}>
                    Retry
                </Button>
            </div>
        );
    }

    if (filterDataModel.isLoading) {
        return <div className="search">load filter data</div>;
    }

    if (!filterDataModel.data) {
        return <div className="search">no filter data</div>;
    }

    return (
        <div className="search">
            <Filter searchModel={searchModel} />
            <Games searchModel={searchModel} />
        </div>
    );
});

export { Search };
