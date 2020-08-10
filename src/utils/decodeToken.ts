import jwt, { DecodeOptions } from 'jsonwebtoken'

export default async function decodeToken(token: string) {
  const decodedToken = jwt.decode(token, process.env.SECRET as DecodeOptions)
  return decodedToken
}
