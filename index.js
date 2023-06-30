import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import routes from './routes/routes.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/', routes)
dotenv.config()

const PORT = process.env.PORT ?? 4001
const URL = process.env.MONGO_URL

mongoose
  .connect(URL)
  .then(() => console.log('DB connected successfuly'))
  .catch(() => console.log('DB error'))

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server started ${PORT}`)
})
