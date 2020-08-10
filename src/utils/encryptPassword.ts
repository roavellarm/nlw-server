import md5, { Options } from 'md5'

export default function encryptPassword(password: string) {
  const encryptedPassword = md5(password, process.env.SECRET as Options)
  return encryptedPassword
}
