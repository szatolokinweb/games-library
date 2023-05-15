import "./app.css";

import { Outlet, Link } from "react-router-dom";

const App: React.FC = () => {
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
                    <Link to="/favourites">Favourites</Link>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export { App };
