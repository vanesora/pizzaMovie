
exports.up = function(db) {
  db.createCollection( 'users',
   {
    name: String,
    lastName: String,
    gender: String,
    email: String,
    picture: String,
    password: String,
    type: String,
    favorities: String,
    likes: String,
    reproduction: String,
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