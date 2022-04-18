import { MongoClient } from "mongodb"

var _db

const getDb = () => new Promise((approve, reject) => {
  if (_db) {
    approve(_db)
  }
  MongoClient.connect('mongodb://app:app@mongo:27017/', function (err, db) {
    if (db) {
      console.log("Successfully connected to MongoDB.")
      _db = db.db("app")
      approve(_db)
    } else {
      reject(err)
    }
  })
})

export default getDb
