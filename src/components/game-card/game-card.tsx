import "./game-card.css";

import classNames from "classnames";
import type { Game } from "../../api/data/games";
import { Rating } from "../rating/rating";
import { HeartIcon } from "../icons/heart-icon";

interface Props {
    data: Game;
    favourite?: boolean;
    className?: string;
    onFavouriteChange?: VoidFunction;
}

const GameCard: React.FC<Props> = (props) => {
    const data = props.data;

    const renderImage = () => {
        const backgroundImage = data.background_image;

        return backgroundImage ? (
            <img className="game-card__image" src={data.background_image} />
        ) : null;
    };

    return (
        <div className={classNames("island", "game-card", props.className)}>
            {renderImage()}
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
