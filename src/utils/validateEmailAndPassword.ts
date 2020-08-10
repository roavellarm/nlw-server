import db from '../database/connection'
import encryptPassword from './encryptPassword'

async function validateEmailAndPassword(email: string, password: string) {
  const user = await db('users')
    .where('email', '=', email)
    .andWhere('password', '=', encryptPassword(password))
    .first()
  return user
}

export default validateEmailAndPassword
