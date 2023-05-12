import "./index.css";

import ReactDOM from "react-dom/client";
import { Search } from "./components/search/search";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<Search />);
