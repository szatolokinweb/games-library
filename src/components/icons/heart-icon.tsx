import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { OuterProps, Icon } from "./icon";

const HeartIcon: React.FC<OuterProps> = (props) => (
    <Icon
        {...props}
        filledComponent={HeartFilled}
        outlinedComponent={HeartOutlined}
    />
);

export { HeartIcon };
