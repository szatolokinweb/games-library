import "./rating.css";

import classNames from "classnames";
import { Star } from "../icon/star";

interface Props {
    rating: number;
    className?: string;
}

const MAX_RATING = 5;

const Rating: React.FC<Props> = ({ rating, className }) => {
    const roundedRating = Math.round(rating);

    const stars = [];

    for (let index = 0; index < MAX_RATING; index++) {
        stars.push(<Star active={index < roundedRating} />);
    }

    return <div className={classNames("rating", className)}>{stars}</div>;
};

export { Rating };
