import "./rating.css";

import classNames from "classnames";
import { StarIcon } from "../icons/star-icon";

interface Props {
    rating: number;
    className?: string;
}

const MAX_RATING: number = 5;

const Rating: React.FC<Props> = (props) => {
    const roundedRating = Math.round(props.rating);

    const starIcons = [];

    for (let rating = 0; rating < MAX_RATING; rating++) {
        starIcons.push(
            <StarIcon key={rating} active={rating < roundedRating} />
        );
    }

    return (
        <div className={classNames("rating", props.className)}>{starIcons}</div>
    );
};

export { Rating };
