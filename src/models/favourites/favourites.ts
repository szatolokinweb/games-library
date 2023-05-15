import { action, autorun, makeObservable, observable } from "mobx";

const KEY: string = "favourites";

class Favourites {
    games: string[];

    constructor() {
        makeObservable(this, {
            games: observable,
            setGames: action,
        });

        const localStorageValue = localStorage.getItem(KEY);

        this.games = localStorageValue ? JSON.parse(localStorageValue) : [];

        autorun(() => {
            localStorage.setItem(KEY, JSON.stringify(this.games));
        });
    }

    setGames(games: string[]) {
        this.games = games;
    }
}

const favourites = new Favourites();

export { favourites };
