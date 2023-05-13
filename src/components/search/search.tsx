import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Search as SearchModel } from "../../models/search/search";
import { Filter } from "../filter/filter";

const Search: React.FC = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchModel = useMemo(
        () => new SearchModel({ searchParams, setSearchParams }),
        []
    );

    const filterDataModel = searchModel.filterDataModel;

    if (filterDataModel.error) {
        return (
            <>
                <h1>error filter data</h1>
                <Button onClick={() => searchModel.filterDataModel.load()}>
                    Retry
                </Button>
            </>
        );
    }

    if (filterDataModel.isLoading) {
        return <div>load filter data</div>;
    }

    if (!filterDataModel.data) {
        return <div>no filter data</div>;
    }

    return <Filter searchModel={searchModel} />;
});

export { Search };
