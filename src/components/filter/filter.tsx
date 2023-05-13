import "./filter.css";

import { Input, Select, Checkbox, Button } from "antd";
import { Search as SearchModel } from "../../models/search/search";
import { convertGenreToSelectOption } from "../../api/data/genres";
import { convertPlatformToSelectOption } from "../../api/data/platforms";
import { convertStoreToSelectOption } from "../../api/data/stores";

interface Props {
    searchModel: SearchModel;
}

const ORDERING_OPTIONS = [
    {
        value: "1",
        label: "qwe",
    },
    {
        value: "2",
        label: "ewq",
    },
    {
        value: "3",
        label: "qqq",
    },
];

const Filter: React.FC<Props> = ({ searchModel }) => {
    return (
        <div className="filter island">
            <Input
                allowClear
                className="filter__title"
                value={searchModel.filter.title}
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
                onChange={(stores) => searchModel.setFilter({ stores })}
            />
            <Select
                className="filter__ordering"
                allowClear
                options={ORDERING_OPTIONS}
                value={searchModel.filter.ordering}
                onChange={(ordering) => searchModel.setFilter({ ordering })}
            />
            <Checkbox
                className="filter__invert"
                checked={searchModel.filter.isInverted}
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
