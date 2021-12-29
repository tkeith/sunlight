import { getDb } from "./db"

export async function getText() {
  return await getDb()
    .then(db =>
      db.collection('test').findOne({})
    )
    .then(row =>
      row?.text || "no data yet"
    )
    .catch(err =>
      console.log(err)
    )
}
