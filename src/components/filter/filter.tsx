import "./filter.css";

import { Input, Select, Checkbox } from "antd";

const Filter: React.FC = () => {
    return (
        <div className="filter island">
            <Input className="filter__title" />
            <Select />
            <Select />
            <Select />
            <Select className="filter__ordering" />
            <Checkbox className="filter__invert">Invert</Checkbox>
        </div>
    );
};

export { Filter };
