import "./navigation.css";

import { NavLink } from "react-router-dom";
import { SearchOutlined, StarOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { favourites } from "../../models/favourites/favourites";
import classNames from "classnames";

const getFavouritesCountText = (count: number): React.ReactNode => {
    if (count > 0) {
        return `(${count})`;
    }

    return null;
};

const Navigation: React.FC = observer(() => {
    const NAVIGATION_ITEMS: { to: string; content: React.ReactNode }[] = [
        {
            to: "/",
            content: (
                <>
                    <SearchOutlined />
                    Search
                </>
            ),
        },
        {
            to: "/favourites",
            content: (
                <>
                    <StarOutlined />
                    Favourites {getFavouritesCountText(favourites.games.length)}
                </>
            ),
        },
    ];

    return (
        <nav className="island">
            <ul className="navigation__list">
                {NAVIGATION_ITEMS.map((item) => (
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                classNames("navigation__link", {
                                    active: isActive,
                                })
                            }
                            to={item.to}
                        >
                            {item.content}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
});

export { Navigation };
