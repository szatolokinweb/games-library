import { createBrowserRouter } from "react-router-dom";
import { Search } from "./components/search/search";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Search />,
    },
]);

export { router };
