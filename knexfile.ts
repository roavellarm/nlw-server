import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || process.env.NODE_ENV,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
}
