import { useMemo } from "react";
import { Search as SearchModel } from "../../models/search";

const Search: React.FC = () => {
    const searchModel = useMemo(() => new SearchModel(), []);

    return <h1>search</h1>;
};

export { Search };
