import { Request, Response } from 'express'
import db from '../database/connection'

async function index(req: Request, res: Response) {
  const totalConnections = await db('connections').count('* as total')

  const { total } = totalConnections[0]
  return res.json({ total })
}

async function create(req: Request, res: Response) {
  const { user_id } = req.body

  await db('connections').insert({ user_id })

  res.status(201).send()
}

export default { index, create }
