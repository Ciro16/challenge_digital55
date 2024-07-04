import express from 'express'
import v1DutyRouter from './v1/routes/dutyRoutes.js'
import cors from 'cors'
import 'dotenv/config'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use('/api/v1/duties', v1DutyRouter)

app.use(errorHandler)

app.listen(PORT)
