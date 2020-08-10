import jwt from 'jsonwebtoken'

export default function verifyToken(token: string) {
  return jwt.verify(token, process.env.SECRET as string, (error, decode) => {
    if (error) return { error }
    return { decode }
  })
}
