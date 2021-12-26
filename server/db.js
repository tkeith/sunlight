import { MongoClient } from "mongodb"

var _db

export const getDb = new Promise(function(approve, reject) {
    if (_db) {
        approve(_db)
    }
    MongoClient.connect('mongodb://app:app@localhost:27017/app', function (err, db) {
        if (db) {
            console.log("Successfully connected to MongoDB.")
            approve(_db)
        }
        return reject(err)
    })
})
