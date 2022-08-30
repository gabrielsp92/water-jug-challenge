import { setupRoutes } from './routes'

import express from 'express'

const app = express()

app.use(express.json())
  .use(express.urlencoded({ extended: true }))

setupRoutes(app)

export default app