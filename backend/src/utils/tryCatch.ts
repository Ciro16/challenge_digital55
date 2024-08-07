import { Request, Response, NextFunction } from "express"

type ControllerType = (req: Request, res: Response) => Promise<void>

export function tryCatch(controller: ControllerType) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await controller(req, res)
    } catch (error) {
      return next(error)
    }
  }
}