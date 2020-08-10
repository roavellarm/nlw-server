import {
  isEmail,
  hasPasswordRequirements,
  isUser,
  validateEmailAndPassword,
} from '../utils'

interface Data {
  name: string
  surname: string
  email: string
  password: string
}

export async function registerValidation(data: Data) {
  const errors = []
  const { name, surname, email, password } = data

  if (!!name) {
    if (typeof name === 'string') {
      if (name.trim() === '') errors.push("Name can't be blank")
    } else {
      errors.push('Name must be string')
    }
  } else {
    errors.push('Name is required')
  }

  if (!!surname) {
    if (typeof surname === 'string') {
      if (surname.trim() === '') errors.push("Surname can't be blank")
    } else {
      errors.push('Surname must be string')
    }
  } else {
    errors.push('Surname is required')
  }

  if (!email) errors.push('Email is required')
  if (!password) errors.push('Password is required')

  if (!isEmail(email)) errors.push('Email is invalid')
  if (!hasPasswordRequirements(password))
    errors.push('Password must have 8 digits, uppercase, lowercase and numbers')

  if (errors.length) return { errors }

  const user = await isUser(email)
  if (user) errors.push('User already registered')
  return { errors }
}

export async function loginValidation(data: Data) {
  const errors = []
  const { email, password } = data
  if (!email) errors.push('Email is required')
  if (!password) errors.push('Password is required')
  if (errors.length) return { errors }

  if (!isEmail(email)) errors.push('Invalid email')

  const user = await validateEmailAndPassword(email, password)
  if (!user) errors.push('Email or password incorrect')

  return { errors, user }
}
