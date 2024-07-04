export class AppError extends Error {
  public readonly statusCode

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}
