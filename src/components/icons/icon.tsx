type ClickHandler = React.MouseEventHandler<HTMLSpanElement>;

type ComponentType = React.ComponentType<{
    className?: string;
    onClick?: ClickHandler;
}>;

interface OuterProps {
    className?: string;
    active?: boolean;
    onClick?: ClickHandler;
}

interface Props extends OuterProps {
    filledComponent: ComponentType;
    outlinedComponent: ComponentType;
}

const Icon: React.FC<Props> = (props) => {
    const Component = props.active
        ? props.filledComponent
        : props.outlinedComponent;

    return <Component className={props.className} onClick={props.onClick} />;
};

export type { OuterProps };
export { Icon };
