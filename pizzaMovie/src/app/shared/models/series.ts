export class Series {
    title: String;
    type: String;
    picture: String;
    description: String;
    seasonNumber: Number;
    dateAdd: String
    seasons?: [{
        chaptersNumber: Number;
        chapters?:[{
            chapters:String[];
        }]
    }]
}
