import { createBrowserRouter } from "react-router-dom";
import { Search } from "./components/search/search";
import { App } from "./components/app/app";
import { Favourites } from "./components/favourites/favourites";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Search />,
            },
            {
                path: "/favourites",
                element: <Favourites />,
            },
        ],
    },
]);

export { router };
