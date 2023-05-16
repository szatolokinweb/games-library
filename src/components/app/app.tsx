import { Navigation } from "../navigation/navigation";
import "./app.css";

import { Outlet, Link } from "react-router-dom";

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="island app__header">
                <Link to="/">🎮 Games</Link>
            </div>
            <Navigation />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export { App };
