import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchModel } from "../../models/search/search";

const Search: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchModel = useMemo(() => new SearchModel(searchParams), []);

    return (
        <>
            {searchModel.filter.genres.map((genre) => (
                <div key={genre}>{genre}</div>
            ))}
        </>
    );
};

export { Search };
