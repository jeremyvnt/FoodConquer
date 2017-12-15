export class HttpError extends Error {
  public message: string
  protected statusCode: number
  protected code: string

  constructor(message: string = 'Unknown error occured') {
    super()
    this.message = message
    this.statusCode = 500
    this.code = 'ServerError'
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}

export default HttpError
