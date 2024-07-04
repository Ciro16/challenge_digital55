import { NewDuty, UpdateDuty } from '../models/duty.js'
import dutyService from '../services/dutyService.js'
import { Request, Response } from 'express'
import { tryCatch } from '../utils/tryCatch.js'
import Joi from 'joi'
import { AppError } from '../AppError.js'

const getAllDuties = tryCatch(async (req: Request, res: Response) => {
  const duties = await dutyService.getAllDuties()
  res.json({ data: duties })
})

const createDuty = tryCatch(async (req: Request, res: Response) => {
  validateDuty(req)

  const newDuty: NewDuty = req.body
  const duty = await dutyService.createDuty(newDuty)
  res.status(201).json({ data: duty })
})

const updateDuty = tryCatch(async (req: Request, res: Response) => {
  const { dutyId } = req.params

  validateDuty(req)

  const updateDuty: UpdateDuty = req.body

  await dutyService.updateDuty(dutyId, updateDuty)
  res.status(204).send()
})

const validateDuty = (req: Request) => {
  const { body } = req

  const validator = Joi.object({
    name: Joi.string().max(30).required()
  })

  const { error } = validator.validate(body)

  if (error) {
    throw new AppError(400, error.details[0].message)
  }
}

export default {
  getAllDuties,
  createDuty,
  updateDuty
}
