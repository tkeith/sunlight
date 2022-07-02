import { MongoClient } from "mongodb"
import callOnce from "./callOnce.js"

const getMongo = callOnce(async () => {
  try {
    const conn = await MongoClient.connect('mongodb://app:app@mongo:27017/')
    return conn.db("app")
  } catch (err) {
    await new Promise(r => setTimeout(r, 1000))
    return await connect()
  }
});

export default getMongo
