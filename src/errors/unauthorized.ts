import { HttpError } from './'

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Une authentification est nécessaire pour accéder à la ressource.',
              code: string = 'Unauthorized') {

    super(message)
    this.statusCode = 401
    this.code = code
  }
}

export default UnauthorizedError
