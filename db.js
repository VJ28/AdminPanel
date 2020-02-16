const mongoose = require("mongoose");

let _db;

function initDb() {
  if (_db) {
    console.log("trying to connect db again");
    return _db;
  }
  mongoose.connect(process.env.MONGO_API, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  _db = mongoose.connection;

  _db.on("open", () => {
    console.log("mongodb connected");
  });

  _db.on("error", err => {
    console.log(" on error", err);
  });
}

function getDb() {
  if (_db) return _db;
  throw "db not initialized";
}

module.exports = {
  initDb,
  getDb
};
