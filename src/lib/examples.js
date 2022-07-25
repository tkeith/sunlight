import getDb from "./getDb.js"

export const getText = async () => {
  const db = await getDb()
  const row = await db.collection('example').findOne({})
  console.log('getText result: ', row)
  const text = row?.text || ""
  return text
}
