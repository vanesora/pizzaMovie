import { Movies } from './movies';

export class User {
    name: String;
    lastName: String;
    gender: String;
    email: String;
    picture: String;
    password: String;
    type: String;
    favorities?: Movies[];
    likes?: Movies[];
    reproduction?: Movies[];
}
