import { BaseController, Route, NextFunction } from './'
import { UnauthorizedError } from '../errors'

export class PassportController extends BaseController {

  static routes: Route[] = [
    { verb: 'all', path: '*', action: 'access' },
  ]

  public access(next: NextFunction) {
    if (!this.req.user)
      next(new UnauthorizedError())

    return next('route')
  }
}

