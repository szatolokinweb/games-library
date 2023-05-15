import "./games.css";

import React from "react";
import { Button } from "antd";
import { observer } from "mobx-react";
import { Search as SearchModel } from "../../models/search/search";
import { GameCard } from "../game-card/game-card";
import { favourites } from "../../models/favourites/favourites";
import { checkIsNotUndefined } from "../../utils/check-is-not-undefined";

interface Props {
    searchModel: SearchModel;
}

const COLUMNS_COUNT: number = 4;

const Games: React.FC<Props> = observer((props) => {
    const games = props.searchModel.games;

    const renderList = (): React.ReactNode => {
        if (!games) {
            return null;
        }

        const list = games.list;

        const columns = [];

        for (let columnIndex = 0; columnIndex < COLUMNS_COUNT; columnIndex++) {
            columns.push(
                <div key={columnIndex} className="games__column">
                    {list
                        .filter(
                            (_, gameIndex) =>
                                gameIndex % COLUMNS_COUNT === columnIndex
                        )
                        .map((game) => {
                            const isFavourite = checkIsNotUndefined(
                                favourites.games.find(
                                    (gameId) => gameId === String(game.id)
                                )
                            );

                            return (
                                <GameCard
                                    key={game.id}
                                    className="games__game-card"
                                    data={game}
                                    favourite={isFavourite}
                                    onFavouriteChange={() => {
                                        if (isFavourite) {
                                            favourites.setGames(
                                                favourites.games.filter(
                                                    (gameId) =>
                                                        gameId !==
                                                        String(game.id)
                                                )
                                            );
                                        } else {
                                            favourites.setGames(
                                                favourites.games.concat(
                                                    String(game.id)
                                                )
                                            );
                                        }
                                    }}
                                />
                            );
                        })}
                </div>
            );
        }

        return <div className="games__row">{columns}</div>;
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
        <div className="games">
            {renderList()}
            {renderState()}
        </div>
    );
});

export { Games };
