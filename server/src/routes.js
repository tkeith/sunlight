import { Router } from "express"
import { getDb } from "./db.js"
import { ObjectId } from "mongodb"

export const routes = Router()

routes.route('/').get((req, res) => {
  getDb()
    .then(db =>
      db.collection('test').findOne({})
    )
    .then(row =>
      res.json({ text: row?.text || "no data yet" })
    )
    .catch((err) => { console.log(err) })
})

routes.route('/save').post((req, res) => {
  getDb()
    .then(db =>
      db.collection('test').updateOne(
        {},
        { $set: { text: req.body.text } },
        { upsert: true, })
    )
    .then(() =>
      res.json()
    )
})

export default routes
