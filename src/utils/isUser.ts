import db from '../database/connection'

export default async function isUser(email: string) {
  const user = await db('users').where('email', '=', email).first()
  return user
}
