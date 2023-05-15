import { observer } from "mobx-react";
import { favourites } from "../../models/favourites/favourites";
import "./app.css";

import { Outlet, Link } from "react-router-dom";

const App: React.FC = observer(() => {
    return (
        <div className="app">
            <div className="island app__header">
                <Link to="/">Games</Link>
            </div>
            <div className="island app__navigation">
                <div>
                    <Link to="/">Search</Link>
                </div>
                <div>
                    <Link to="/favourites">
                        Favourites ({favourites.games.length})
                    </Link>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
});

export { App };
