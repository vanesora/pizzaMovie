import { Movies } from './movies';
import { Series } from './series';

export class User {
    name: String;
    lastName: String;
    gender: String;
    email: String;
    picture: String;
    password: String;
    type: String;
    _id?: String;
    favoritiesMovies?: Movies[];
    favoritiesSeries?: Series[];
}
