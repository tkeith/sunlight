import exampleRoutes from './example-routes.js'
import { Router } from "express"

export const router = Router()

router.use('/examples', exampleRoutes)

export default router
