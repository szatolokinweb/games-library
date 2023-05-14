import { StarFilled, StarOutlined } from "@ant-design/icons";
import { OuterProps, Icon } from "./icon";

const Star: React.FC<OuterProps> = (props) => (
    <Icon
        {...props}
        filledComponent={StarFilled}
        outlinedComponent={StarOutlined}
    />
);

export { Star };
