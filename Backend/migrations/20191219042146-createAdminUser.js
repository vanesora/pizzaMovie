
exports.up = function(db) {
  db.insert('users',{ name: "admin", lastName: "", gender: "Mujer", email: "admin@pizzamovie.co", password: "admin", "type":"USER_PREMIUM" });
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};