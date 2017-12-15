import { HttpError } from './'

export class NotFoundError extends HttpError {
  constructor(message: string = 'Page not found', code: string = 'NotFound') {
    super(message)
    this.statusCode = 404
    this.code = code
  }
}

export default NotFoundError
