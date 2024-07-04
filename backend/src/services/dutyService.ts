import { AppError } from "../AppError.js"
import { db_config } from "../database/config.js"
import { NewDuty, Duty, UpdateDuty } from "../models/duty.js"
import pg from 'pg'

const { Pool } = pg
const pool = new Pool(db_config)

const getAllDuties = async (): Promise<Duty[]> => {
  const duties: pg.QueryResult<Duty> = await pool.query('SELECT * FROM duties ORDER BY id ASC;')

  return duties.rows
}

const createDuty = async (newDuty: NewDuty): Promise<Duty> => {
  const statement = 'INSERT INTO duties (name) VALUES ($1) RETURNING *'
  const values = [newDuty.name]

  const result: pg.QueryResult<Duty> = await pool.query(statement, values)

  return result.rows[0]
}

const updateDuty = async (dutyId: string, updateDuty: UpdateDuty): Promise<void> => {
  const statement = 'UPDATE duties SET name = ($1) WHERE id = ($2)'
  const values = [updateDuty.name, dutyId]

  const result = await pool.query(statement, values)

  if (result.rowCount === 0) {
    throw new AppError(404, 'Duty Not Found')
  }
}

export default {
  getAllDuties,
  createDuty,
  updateDuty
}
