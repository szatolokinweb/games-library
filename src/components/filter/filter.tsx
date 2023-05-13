import "./filter.css";

import { Input, Select, Checkbox, Button } from "antd";
import { Search as SearchModel } from "../../models/search/search";
import { convertGenreToSelectOption } from "../../api/data/genres";
import { convertPlatformToSelectOption } from "../../api/data/platforms";
import { convertStoreToSelectOption } from "../../api/data/stores";
import { ORDERING_SELECT_OPTIONS } from "../../utils/orderings";

interface Props {
    searchModel: SearchModel;
}

const Filter: React.FC<Props> = ({ searchModel }) => {
    return (
        <div className="filter island">
            <Input
                allowClear
                className="filter__title"
                value={searchModel.filter.title}
                placeholder="Title"
                onChange={(event) =>
                    searchModel.setFilter({ title: event.target.value })
                }
            />
            <Select
                mode="multiple"
                allowClear
                options={
                    searchModel.filterDataModel.data?.genres.map(
                        convertGenreToSelectOption
                    ) ?? []
                }
                value={searchModel.filter.genres}
                placeholder="Genres"
                onChange={(genres) => searchModel.setFilter({ genres })}
            />
            <Select
                mode="multiple"
                allowClear
                options={
                    searchModel.filterDataModel.data?.platforms.map(
                        convertPlatformToSelectOption
                    ) ?? []
                }
                value={searchModel.filter.platforms}
                placeholder="Platforms"
                onChange={(platforms) => searchModel.setFilter({ platforms })}
            />
            <Select
                mode="multiple"
                allowClear
                options={
                    searchModel.filterDataModel.data?.stores.map(
                        convertStoreToSelectOption
                    ) ?? []
                }
                value={searchModel.filter.stores}
                placeholder="Stores"
                onChange={(stores) => searchModel.setFilter({ stores })}
            />
            <Select
                className="filter__ordering"
                allowClear
                options={ORDERING_SELECT_OPTIONS}
                value={searchModel.filter.ordering}
                placeholder="Ordering"
                onChange={(ordering) => searchModel.setFilter({ ordering })}
            />
            <Checkbox
                className="filter__invert"
                checked={searchModel.filter.isInverted}
                disabled={!searchModel.filter.ordering}
                onChange={(event) =>
                    searchModel.setFilter({ isInverted: event.target.checked })
                }
            >
                Invert
            </Checkbox>
            <Button
                className="filter__reset"
                type="primary"
                danger
                disabled={searchModel.isInitialFilter}
                onClick={() => searchModel.resetFilter()}
            >
                Reset
            </Button>
        </div>
    );
};

export { Filter };
