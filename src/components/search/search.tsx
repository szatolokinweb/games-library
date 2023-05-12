import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchModel } from "../../models/search";

const Search: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchModel = useMemo(() => new SearchModel(searchParams), []);

    return <h1>search</h1>;
};

export { Search };
