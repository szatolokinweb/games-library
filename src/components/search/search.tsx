import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react";
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
        return <div>error filter data</div>;
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
