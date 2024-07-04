import { PoolConfig } from "pg"

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD } = process.env

export const db_config: PoolConfig = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432
}