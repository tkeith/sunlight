import { Router } from "express"
import getMongo from "../lib/mongo.js"
import getRedis from "../lib/redis.js"
import { ObjectId } from "mongodb"
import getConfig from "../lib/config.js"
import { getText } from '../lib/misc.js'
import * as yup from 'yup'
import redlock from '../lib/redlock.js'
import getRateLimiter from '../lib/ratelimit.js'
import { getQueue } from "../lib/bullmq.js"

export const routes = Router()

routes.route('/examples/isMongoExpressEnabled').get(async (req, res) => {
  const cfg = await getConfig()
  res.json(cfg.mongo_express_enabled)
})

routes.route('/examples/getText').get(async (req, res) => {
  res.json({ text: await getText() })
})

routes.route('/examples/saveText').post(async (req, res) => {
  const db = await getMongo()
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
  res.json('new text saved')
})

const exampleSaveTextQueue = getQueue('exampleSaveTextQueue');

routes.route('/examples/saveTextAfterDelay').post(async (req, res) => {
  try {
    var newText = await yup.string().required().validate(req.body.text)
    var delay = await yup.number().required().validate(req.body.delay)
  } catch (err) {
    res.status(400)
    res.json('invalid input')
  }
  const job = await exampleSaveTextQueue.add('save text after delay', {newText: newText}, { delay: delay })

  res.json(job)
})

routes.route('/examples/redis/getText').get(async (req, res) => {
  res.json({ text: (await getRedis()).get('example:text') })
})

routes.route('/examples/redis/saveText').post(async (req, res) => {
  try {
    var newText = await yup.string().required().validate(req.body.text)
  } catch (err) {
    res.status(400)
    res.json('invalid text')
  }

  (await getRedis()).set('example:text', newText)

  res.json()
})

routes.route('/examples/redlock').post(async (req, res) => {
  redlock.using(['examples', 'redlock'], 5000, async function (signal) {
    res.json('acquired lock, it will be blocked for 3 seconds')
    await new Promise(r => setTimeout(r, 3000))
  })
})

const rateLimiter = getRateLimiter('example-rate-limiter', 1, 5000)

routes.route('/examples/ratelimit').get(async (req, res) => {
  try {
    await rateLimiter.consume('test', 1)
    res.json(true)
  } catch (err) {
    res.json(false)
  }
})

export default routes
