import type { SelectOption } from "./select";

const ORDERINGS = ["name", "released", "rating", "metacritic"] as const;

type Ordering = (typeof ORDERINGS)[number];

const ORDERINGS_TITLE_DICTIONARY: Record<Ordering, string> = {
    name: "Title",
    released: "Released",
    rating: "Rating",
    metacritic: "Metacritic",
};

const ORDERING_SELECT_OPTIONS: SelectOption<Ordering>[] = ORDERINGS.map(
    (ordering) => ({
        value: ordering,
        label: ORDERINGS_TITLE_DICTIONARY[ordering],
    })
);

export { ORDERING_SELECT_OPTIONS };
