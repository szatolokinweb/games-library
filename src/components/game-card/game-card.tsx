import "./game-card.css";

import type { Game } from "../../api/data/games";
import { Rating } from "../rating/rating";
import { HeartIcon } from "../icons/heart-icon";

interface Props {
    data: Game;
    favourite?: boolean;
    onFavouriteChange?: VoidFunction;
}

const GameCard: React.FC<Props> = (props) => {
    const data = props.data;

    return (
        <div className="island game-card">
            <img className="game-card__image" src={data.background_image} />
            <div className="game-card__title">
                <b>{data.name}</b>
            </div>
            <div className="game-card__released">
                <b>Released:</b> {data.released}
            </div>
            <div className="game-card__row">
                <Rating rating={data.rating} />
                <HeartIcon
                    className="game-card__favourite"
                    active={props.favourite}
                    onClick={(event) => {
                        event.preventDefault();

                        props.onFavouriteChange?.();
                    }}
                />
            </div>
        </div>
    );
};

export { GameCard };
