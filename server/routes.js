import { Router } from "express"

const routes = Router()

routes.route('/').get(function (req, res) {
  res.json({ hello: 'world' })
})

export default routes
