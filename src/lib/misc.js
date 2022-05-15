import getDb from "./db.js"

export async function getTextOld() {
  return await getDb()
    .then(db =>
      db.collection('example').findOne({})
    )
    .then(row =>
      row?.text || ""
    )
    .catch(err =>
      console.log(err)
    )
}

export const getText = async () => {
  const db = await getDb()
  const row = await db.collection('example').findOne({})
  console.log(row)
  const text = row?.text || ""
  return text
}
