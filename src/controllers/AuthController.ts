import { Request, Response } from 'express'
import { registerValidation, loginValidation } from '../validations/auth'
import { createUser, generateToken, Options } from '../utils'

async function login(req: Request, res: Response) {
  const { errors, user } = await loginValidation(req.body)
  if (errors.length) return res.status(400).send({ error: errors })

  const token = generateToken(user)

  return res.send({ token })
}

async function register(req: Request, res: Response) {
  const { errors } = await registerValidation(req.body)

  if (errors.length) return res.status(400).send({ error: errors })

  const { error, user } = await createUser(req.body)

  if (error) return res.status(400).send({ error })

  return res.status(201).send({ token: generateToken(user as Options) })
}

export default { login, register }
