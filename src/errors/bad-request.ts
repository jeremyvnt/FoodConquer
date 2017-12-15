import { HttpError } from './'
export class BadRequestError extends HttpError {
  constructor(
    message: string = 'Something is wrong with the request',
    code: string = 'BadRequest',
    ) {
    super(message)
    this.statusCode = 400
    this.code = code
  }
}

export default BadRequestError
