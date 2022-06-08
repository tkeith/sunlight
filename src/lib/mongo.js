import { MongoClient } from "mongodb"

const connect = async () => {
  try {
    const conn = await MongoClient.connect('mongodb://app:app@mongo:27017/')
    return conn.db("app")
  } catch (err) {
    await new Promise(r => setTimeout(r, 1000))
    return await connect()
  }
}

let connPromise

const getMongo = () => {
  if (!connPromise) {
    connPromise = connect()
  }
  return connPromise
}

export default getMongo
