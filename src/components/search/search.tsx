import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "antd";
import { observer } from "mobx-react";
import { Search as SearchModel } from "../../models/search/search";

const Search: React.FC = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchModel = useMemo(
        () => new SearchModel({ searchParams, setSearchParams }),
        []
    );

    return (
        <Input
            value={searchModel.filter.title}
            onChange={(e) => searchModel.setFilter({ title: e.target.value })}
        />
    );
});

export { Search };
