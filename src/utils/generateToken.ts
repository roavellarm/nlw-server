import jwt from 'jsonwebtoken'

export interface Options {
  id: string
  email: string
  password: string
}

export default function generateToken(options: Options) {
  const { id, email, password } = options
  return jwt.sign({ id, email, password }, process.env.SECRET as string, {
    expiresIn: '1d',
  })
}
