import { BaseController, Route, NextFunction } from './'
import { User } from '../models'
import * as jwt from 'jsonwebtoken'
import { secret } from '../boot'
import crypto from 'crypto'
import { UnprocessableEntityError } from '../errors'
import { UserService } from '../core/utils/user'

export class RegisterController extends BaseController {

  static basePath = '/auth'

  static routes: Route[] = [
    { verb: 'post', path: '/register', action: 'register' },
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

  public async register(next: NextFunction) {
    const email: string = this.req.body.email
    const pseudo: string = this.req.body.pseudo
    const password: string = this.req.body.password

    const userService = new UserService()

    if (!email)
      throw new UnprocessableEntityError('Vous devez entrer votre adresse mail.')

    if (!pseudo)
      throw new UnprocessableEntityError('Vouz devez fournir un pseudo.')

    if (!password)
      throw new UnprocessableEntityError('Vous devez entrer votre mot de passe.')


    const existingUser = await User.findOne({ where: { email } })
    if (existingUser)
      throw new UnprocessableEntityError('Cet email est déja utilisé.')


    // If email is unique and password was provided, create account
    const user = await userService.createUser(pseudo, password, email)
    const userInfo = this.setUserInfo(user)
    const resources = await this.resourcesService.getUserResources(user)

    return {
      resources,
      token: 'JWT ' + this.generateToken(userInfo),
      user: userInfo,
    }
  }
}

