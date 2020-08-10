import { Request, Response } from 'express'
import { registerValidation } from '../validations/auth'
import { createUser, generateToken, Options } from '../utils'

function login(req: Request, res: Response) {}

async function register(req: Request, res: Response) {
  const { errors } = await registerValidation(req.body)

  if (errors.length) return res.status(400).send({ error: errors })

  const { error, user } = await createUser(req.body)
  console.log(user)
  if (error) return res.status(400).send({ error })

  return res.status(201).send({ token: generateToken(user as Options) })
}

export default { login, register }
