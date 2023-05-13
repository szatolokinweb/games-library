import "./games.css";

import React from "react";
import { Button } from "antd";
import { observer } from "mobx-react";
import { Search as SearchModel } from "../../models/search/search";

interface Props {
    searchModel: SearchModel;
}

const Games: React.FC<Props> = observer((props) => {
    const games = props.searchModel.games;

    const renderList = (): React.ReactNode => {
        if (!games) {
            return null;
        }

        return (
            <ul>
                {games.list.map((game) => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        );
    };

    const renderButtonText = (): string | null => {
        if (!games) {
            return null;
        }

        if (games.error) {
            return "Retry";
        }

        if (games.isLoading) {
            return "Loading...";
        }

        if (games.isFullyLoaded) {
            return null;
        }

        return "Load more";
    };

    const renderState = (): React.ReactNode => {
        if (!games) {
            return null;
        }

        if (games.isFullyLoaded) {
            return null;
        }

        return (
            <Button
                type="primary"
                danger={Boolean(games.error)}
                disabled={games.isLoading}
                onClick={() => games.fetchNextPage()}
            >
                {renderButtonText()}
            </Button>
        );
    };

    return (
        <div className="games island">
            {renderList()}
            {renderState()}
        </div>
    );
});

export { Games };
