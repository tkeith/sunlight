import { Router } from "express"
import getMongo from "../lib/mongo.js"
import getRedis from "../lib/redis.js"
import { ObjectId } from "mongodb"
import getConfig from "../lib/config.js"
import { getText } from '../lib/examples.js'
import * as yup from 'yup'
import redlock from '../lib/redlock.js'
import getRateLimiter from '../lib/ratelimit.js'
import { getQueue } from "../lib/bullmq.js"

const router = Router()

router.route('/isMongoExpressEnabled').get(async (req, res) => {
  const cfg = await getConfig()
  res.json(cfg.mongo_express_enabled)
})

router.route('/getText').get(async (req, res) => {
  res.json({ text: await getText() })
})

router.route('/saveText').post(async (req, res) => {
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

router.route('/saveTextAfterDelay').post(async (req, res) => {
  try {
    var newText = await yup.string().required().validate(req.body.text)
    var delay = await yup.number().required().validate(req.body.delay)
  } catch (err) {
    res.status(400)
    res.json('invalid input')
  }
  const job = await exampleSaveTextQueue.add('save text after delay', { newText: newText }, { delay: delay })

  res.json(job)
})

router.route('/redis/getText').get(async (req, res) => {
  const text = await (await getRedis()).get('example:text');
  res.json({ text: text })
})

router.route('/redis/saveText').post(async (req, res) => {
  try {
    var newText = await yup.string().required().validate(req.body.text)
  } catch (err) {
    res.status(400)
    res.json('invalid text')
  }

  (await getRedis()).set('example:text', newText)

  res.json()
})

router.route('/redlock').post(async (req, res) => {
  redlock.using(['examples', 'redlock'], 5000, async function (signal) {
    res.json('Acquired lock, holding it for 3 seconds')
    await new Promise(r => setTimeout(r, 3000))
  })
})

const rateLimiter = getRateLimiter('example-rate-limiter', 1, 3000)

router.route('/ratelimit').get(async (req, res) => {
  try {
    await rateLimiter.consume('test', 1)
    res.json(true)
  } catch (err) {
    res.json(false)
  }
})

router.route('/params/:foo/:bar').get(async (req, res) => {
  return res.json(req.params)
})

router.route('/headers').get(async (req, res) => {
  return res.json(req.headers)
})

export default router
