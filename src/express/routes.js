import { Router } from "express"
import getDb from "../lib/db.js"
import { ObjectId } from "mongodb"
import getConfig from "../lib/config.js"
import { getText } from '../lib/misc.js'
import * as yup from 'yup'

export const routes = Router()

routes.route('/examples/getText').get(async (req, res) => {
  res.json({ text: await getText() })
})

routes.route('/examples/saveText').post(async (req, res) => {
  const db = await getDb()
  try {
    var newText = await yup.string().required().validate(req.body.text)
  } catch (err) {
    res.status(400)
    res.json('invalid text')
  }
  await db.collection('example').updateOne(
    {},
    { $set: { text: newText } },
    { upsert: true, })
  res.json()
})

routes.route('/examples/is_mongo_express_enabled').get(async (req, res) => {
  const cfg = await getConfig()
  res.json(cfg.mongo_express_enabled)
})

export default routes
