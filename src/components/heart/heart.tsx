import { HeartOutlined, HeartFilled } from "@ant-design/icons";

interface Props {
    active?: boolean;
    className?: string;
    onClick?: () => void;
}

const Heart: React.FC<Props> = (props) => {
    const Component = props.active ? HeartFilled : HeartOutlined;

    return <Component className={props.className} onClick={props.onClick} />;
};

export { Heart };
