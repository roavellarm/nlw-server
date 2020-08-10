export default function hasPasswordRequirements(password: string) {
  const isAccepted = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)
  return isAccepted
}
