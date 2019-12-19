# PizzaMovie Backend

Our Backend has been build with node-express and mongodb.

## Start API server

Be sure of be running mongodb on your local machine

Run: <br />
`npm i` to install dependecies <br />
`npm run migrate` to run migrations <br />
`npm run start` to start the node-express server <br />

## Migrations

`npm run migrate` to run migrations <br />

If you want to create new migrations run: <br />
`db-migrate nombreMigracion` <br />
Take in mind that the file created is based on the actual date.

## Routes

## Models

### User
User has the following model
```
  name: String,
  lastName: String,
  gender: String,
  email: String,
  picture: String,
  password: String,
  type: String,
  favorities: String,
  likes: String,
  reproduction: String
```

### Movie
Movie has the following model
```
  title: String,
  type: String,
  picture: String,
  description: String,
  movie: String,
  numberReproduction: Number
```

### Chapter
Chapter has the following model
```
  title: String,
  type: String,
  picture: String,
  description: String,
  chapter: String
```
