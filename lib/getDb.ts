import { Db, MongoClient } from "mongodb"
import asyncRetryTimeout from "./asyncRetryTimeout"
import callOnce from "./callOnce"

const connect = async () => {
  const conn = await MongoClient.connect('mongodb://app:app@mongo:27017/')
  return conn.db("app")
}

const retryer = async () => asyncRetryTimeout(10000, 1000, connect);

const getDb: () => Promise<Db> = callOnce(retryer);

export default getDb
