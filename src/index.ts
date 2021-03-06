require('@babel/register')({ extensions: ['.js', '.ts'] })
import express from 'express'
import routes from './routes'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const { PORT } = process.env

app.listen(PORT)
