import "./filter.css";

import { Input, Select, Checkbox } from "antd";
import { Search as SearchModel } from "../../models/search/search";

interface Props {
    searchModel: SearchModel;
}

const FAKE_OPTIONS = [
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
                className="filter__title"
                value={searchModel.filter.title}
                onChange={(event) =>
                    searchModel.setFilter({ title: event.target.value })
                }
            />
            <Select
                mode="multiple"
                allowClear
                options={FAKE_OPTIONS}
                value={searchModel.filter.genres}
                onChange={(genres) => searchModel.setFilter({ genres })}
            />
            <Select
                mode="multiple"
                allowClear
                options={FAKE_OPTIONS}
                value={searchModel.filter.platforms}
                onChange={(platforms) => searchModel.setFilter({ platforms })}
            />
            <Select
                mode="multiple"
                allowClear
                options={FAKE_OPTIONS}
                value={searchModel.filter.stores}
                onChange={(stores) => searchModel.setFilter({ stores })}
            />
            <Select
                className="filter__ordering"
                allowClear
                options={FAKE_OPTIONS}
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
        </div>
    );
};

export { Filter };
