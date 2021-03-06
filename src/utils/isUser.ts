import db from '../database/connection'

export default async function isUser(email: string) {
  const user = await db('users')
    .where('email', '=', email)
    .first()
    .select(['id', 'name', 'surname', 'email', 'avatar', 'whatsapp', 'bio'])

  return user
}
