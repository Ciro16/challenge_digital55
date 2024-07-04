import { NextFunction, Request, Response } from "express"
import dutyController from "../../src/controllers/dutyController"
import dutyService from "../../src/services/dutyService"
import { AppError } from "../../src/AppError";

jest.mock("../../src/services/dutyService")

const req = {} as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;

res.json = jest.fn();
res.status = jest.fn().mockReturnThis();
res.send = jest.fn()

describe('GetAllDuties Controller', () => {
  const duties = [
    {
      "id": 1,
      "name": "Clean the house"
    },
    {
      "id": 2,
      "name": "Do exercise"
    },
  ]

  test('Should call getAllDuties service', async () => {
    await dutyController.getAllDuties(req, res, next)

    expect(dutyService.getAllDuties).toHaveBeenCalled()
  })

  test('Should response with correct data', async () => {
    dutyService.getAllDuties = jest.fn().mockResolvedValue(duties)

    await dutyController.getAllDuties(req, res, next)

    expect(res.json).toHaveBeenCalledWith({ data: duties })
  })
})

describe('CreateDuty Controller', () => {
  const newDuty = {
    name: 'My new Duty'
  }

  test('Should call createDuty service', async () => {
    req.body = newDuty

    await dutyController.createDuty(req, res, next)

    expect(dutyService.createDuty).toHaveBeenCalledWith(newDuty)
  })

  test('Should response with correct data', async () => {
    const dutyCreated = { id: 3, ...newDuty }
    req.body = newDuty

    dutyService.createDuty = jest.fn().mockResolvedValue(dutyCreated)

    await dutyController.createDuty(req, res, next)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ data: dutyCreated })
  })

  test('Should throw a name required error', async () => {
    const invalidDuty = { invalidField: 'New Duty' }
    req.body = invalidDuty

    await dutyController.createDuty(req, res, next)

    expect(next).toHaveBeenCalledWith(new AppError(400, '"name" is required'))
  })
})

describe('UpdateDuty Controller', () => {
  const updatedDuty = {
    name: 'My new Duty'
  }

  test('Should call updateDuty service', async () => {
    req.params = { dutyId: '2' }
    req.body = updatedDuty

    await dutyController.updateDuty(req, res, next)

    expect(dutyService.updateDuty).toHaveBeenCalledWith(req.params.dutyId, updatedDuty)
  })

  test('Should response with correct data', async () => {
    req.params = { dutyId: '2' }
    req.body = updatedDuty

    await dutyController.updateDuty(req, res, next)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalled()
  })

  test('Should throw a name required error', async () => {
    req.params = { dutyId: '2' }

    const invalidDuty = { invalidField: 'New Duty' }
    req.body = invalidDuty

    await dutyController.updateDuty(req, res, next)

    expect(next).toHaveBeenCalledWith(new AppError(400, '"name" is required'))
  })
})