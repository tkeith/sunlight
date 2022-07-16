import { MongoClient } from "mongodb"
import asyncRetryTimeout from "./asyncRetryTimeout.js"
import callOnce from "./callOnce.js"

const connect = async () => {
  const conn = await MongoClient.connect('mongodb://app:app@mongo:27017/')
  return conn.db("app")
}

const retryer = async () => asyncRetryTimeout(60000, 1000, connect);

const getMongo = callOnce(retryer);

export default getMongo
