
exports.up = function(db) {
  db.createCollection( 'movies',
   {
    title: String,
    release_year: Number,
    duration: Number,
    category: Array,
    directed_by: String,
    casting: Array,
    description: String,
    trailer: String,
    picture: String,
    numberReproduction: Number,
    dateAdd: String
   }
  );
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};