import { Request, Response } from 'express'

function login(request: Request, response: Response) {}

function register(request: Request, response: Response) {
  return response.status(201).send({ data: request.body })
}

export default { login, register }
