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

    return <Filter searchModel={searchModel} />;
});

export { Search };
