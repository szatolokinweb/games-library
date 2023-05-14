import React from "react";

type HTMLReactComponent = React.ComponentType<React.HTMLAttributes<{}>>;

interface OuterProps {
    className?: string;
    active?: boolean;
    onClick?: VoidFunction;
}

interface Props extends OuterProps {
    filledComponent: HTMLReactComponent;
    outlinedComponent: HTMLReactComponent;
}

const Icon: React.FC<Props> = ({
    filledComponent,
    outlinedComponent,
    className,
    active,
    onClick,
}) => {
    const Component = active ? filledComponent : outlinedComponent;

    return <Component className={className} onClick={onClick} />;
};

export type { OuterProps };
export { Icon };
