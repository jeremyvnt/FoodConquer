import { HttpError } from './'
export class PreconditionFailedError extends HttpError {
  constructor(message: string = 'Préconditions envoyées par la requête non vérifiées.',
              code: string = 'PreconditionFailed') {

    super(message)
    this.statusCode = 412
    this.code = code
  }
}

export default PreconditionFailedError
