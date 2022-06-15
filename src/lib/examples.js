import getMongo from "./mongo.js"

export const getText = async () => {
  const db = await getMongo()
  const row = await db.collection('example').findOne({})
  console.log('getText result: ', row)
  const text = row?.text || ""
  return text
}
