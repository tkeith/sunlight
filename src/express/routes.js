import exampleRoutes from './example-routes.js'
import { Router } from "express"
import * as gridfs from '../lib/gridfs.js'

// catch async errors
// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
let wrap = fn => (...args) => fn(...args).catch(args[2])

const router = Router()
export default router

router.use('/examples', exampleRoutes)

router.route('/grid/public/:filename(*)').get(wrap(async (req, res) => {
  const gridFn = 'public/' + req.params.filename
  res.setHeader('content-type', (await gridfs.getMetadata(gridFn)).mime)
  ;(await gridfs.getGridFsBucket()).openDownloadStreamByName(gridFn).pipe(res)
}))


