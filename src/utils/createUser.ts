import db from '../database/connection'
import { encryptPassword } from '../utils'

interface User {
  id: number
  name: string
  surname: string
  email: string
  password: string
  avatar: string
  whatsapp: string
  bio: string
}

export default async function createUser(bodyRequest: User) {
  const trx = await db.transaction()

  try {
    const result = await trx('users')
      .insert({
        name: bodyRequest.name,
        surname: bodyRequest.surname,
        email: bodyRequest.email,
        password: encryptPassword(bodyRequest.password),
      })
      .returning([
        'id',
        'name',
        'surname',
        'email',
        'avatar',
        'whatsapp',
        'bio',
      ])

    await trx.commit()
    return { user: result[0] }
  } catch (error) {
    trx.rollback()
    return { error: 'There was and error creating user' }
  }
}
