import { Router, Request, Response } from "express"
import getDb from "../lib/getDb"
import getRedis from "../lib/getRedis"
import getConfig from "../lib/getConfig"
import { getText } from '../lib/examples'
import * as yup from 'yup'
import redlock from '../lib/redlock'
import getRateLimiter from '../lib/ratelimit'
import { getQueue } from "../lib/bullmq"

const router = Router()

router.route('/isMongoExpressEnabled').get(async (req: Request, res: Response) => {
  const cfg = await getConfig()
  res.json(cfg.mongo_express_enabled)
})

router.route('/getText').get(async (req: Request, res: Response) => {
  res.json({ text: await getText() })
})

router.route('/saveText').post(async (req: Request, res: Response) => {
  const db = await getDb();
  try {
    var newText = await yup.string().required().validate(req.body.text);
  } catch (err) {
    res.status(400);
    res.json('invalid text');
    return;
  }
  await db.collection('example').updateOne(
    {},
    { $set: { text: newText } },
    { upsert: true, });
  res.json('new text saved');
});

const exampleSaveTextQueue = getQueue('exampleSaveTextQueue');

router.route('/saveTextAfterDelay').post(async (req: Request, res: Response) => {
  try {
    var newText = await yup.string().required().validate(req.body.text)
    var delay = await yup.number().required().validate(req.body.delay)
  } catch (err) {
    return res.status(400).json('invalid input')
  }
  const job = await exampleSaveTextQueue.add('save text after delay', { newText: newText }, { delay: delay })

  return res.json(job)
})

router.route('/redis/getText').get(async (req: Request, res: Response) => {
  const text = await (await getRedis()).get('example:text');
  res.json({ text: text })
})

router.route('/redis/saveText').post(async (req: Request, res: Response) => {
  try {
    var newText = await yup.string().required().validate(req.body.text)
  } catch (err) {
    return res.status(400).json('invalid text')
  }

  (await getRedis()).set('example:text', newText)

  return res.json()
})

router.route('/redlock').post(async (req: Request, res: Response) => {
  redlock.using(['examples', 'redlock'], 5000, async function () {
    res.json('Acquired lock, holding it for 3 seconds')
    await new Promise(r => setTimeout(r, 3000))
  })
})

const rateLimiter = getRateLimiter('example-rate-limiter', 1, 3000)

router.route('/ratelimit').get(async (req: Request, res: Response) => {
  try {
    await rateLimiter.consume('test', 1)
    res.json(true)
  } catch (err) {
    res.json(false)
  }
})

router.route('/params/:foo/:bar').get(async (req: Request, res: Response) => {
  return res.json(req.params)
})

router.route('/requestDetails').get(async (req: Request, res: Response) => {
  return res.json({
    headers: req.headers,
    query: req.query,
    body: req.body,
  })
})

export default router
