
exports.up = function(db) {
  db.insert('movies',{ title:"A.I. Inteligencia Artificial", release_year:2001, duration:140, category:['Drama','Aventura'], directed_by:"Steven Spielberg", casting:['Haley Joel Osment','Jude Law','Sam Robards','Jake Thomas'], description:"Acá la descripción", trailer:"https://www.youtube.com/watch?v=BQ2iMHFMmCk", picture:"assets/movies/portadas", numberReproduction:50, dateAdd:"Tue Dec 19 2019 18:57:25 GMT-0500"});
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};