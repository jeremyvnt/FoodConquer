import { BaseController, Route, NextFunction } from './'
import { User } from '../models'
import * as jwt from 'jsonwebtoken'
import { secret } from '../boot'
import crypto from 'crypto'
import { UnprocessableEntityError } from '../errors'
import { UserService } from '../core/utils/user'

export class LoginController extends BaseController {

  static basePath = '/auth'

  static routes: Route[] = [
    { verb: 'post', path: '/login', action: 'login' },
  ]

  private generateToken(user: any) {
    return jwt.sign(user, secret, {
      expiresIn: 10080, // in seconds
    })
  }

  private setUserInfo(user: any) {
    return {
      pseudo: user.pseudo,
      password: user.password,
      email: user.email,
    }
  }

  public async login(next: NextFunction) {

    const userInfo = this.setUserInfo(this.req.user)
    const resources = await this.resourcesService.getUserResources(this.req.user)

    return ({
      resources,
      token: 'JWT ' + this.generateToken(userInfo),
      user: userInfo,
    })
  }
}

