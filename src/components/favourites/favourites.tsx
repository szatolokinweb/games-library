import "./favourites.css";

import { observer } from "mobx-react";
import { favourites } from "../../models/favourites/favourites";
import { GameCard } from "../game-card/game-card";
import { useEffect, useState } from "react";
import { Game, fetchGame } from "../../api/data/games";
import { checkIsNotUndefined } from "../../utils/check-is-not-undefined";

const Favourites: React.FC = observer(() => {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        Promise.all(favourites.games.map(fetchGame)).then(setGames);
    }, [setGames]);

    if (games.length === 0) {
        return null;
    }

    return (
        <div className="favourites">
            {favourites.games.map((gameId) => {
                const data = games.find((game) => String(game.id) === gameId);

                if (checkIsNotUndefined(data)) {
                    return (
                        <GameCard
                            key={gameId}
                            data={data}
                            favourite
                            onFavouriteChange={() =>
                                favourites.setGames(
                                    favourites.games.filter(
                                        (id) => id !== gameId
                                    )
                                )
                            }
                        />
                    );
                }

                return null;
            })}
        </div>
    );
});

export { Favourites };
