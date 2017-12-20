import { HttpError } from './'

export class UnprocessableEntityError extends HttpError {
  constructor(message: string = 'L’entité fournie avec la requête est incompréhensible ou incomplète.',
              code: string = 'UnprocessableEntity') {

    super(message)
    this.statusCode = 422
    this.code = code
  }
}

export default UnprocessableEntityError
