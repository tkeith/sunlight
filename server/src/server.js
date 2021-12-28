import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes.js"

dotenv.config({ path: "./config.env" })

const port = 8080
const app = express()
app.use(cors())
app.use(json())
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
