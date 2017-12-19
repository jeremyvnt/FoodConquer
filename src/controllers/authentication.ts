import { BaseController, Route, NextFunction } from './'
import { User } from '../models'
import * as jwt from 'jsonwebtoken'
import secret from '../boot'
import crypto from 'crypto'

export class AuthenticationController extends BaseController {
  static routes: Route[] = [
    { verb: 'post', path: '/login', action: 'login' },
    { verb: 'post', path: '/register', action: 'register' },
  ]

  private generateToken(user: any) {
    return jwt.sign(user, secret, {
      expiresIn: 10080, // in seconds
    })
  }

  private setUserInfo(user: any) {
    return {
      id: user.id,
      pseudo: user.pseudo,
      password: user.password,
      email: user.email,
    }
  }

  public login(next: NextFunction) {

    const userInfo = this.setUserInfo(this.req.user)

    this.res.status(200).json({
      token: 'JWT ' + this.generateToken(userInfo),
      user: this.req.user,
    })
  }

  public register(next: NextFunction) {
    const email: string = this.req.body.email
    const pseudo: string = this.req.body.firstName
    const password: string = this.req.body.password

    // Return error if no email provided
    if (!email) {
      return this.res.status(422).send({ error: 'You must enter an email address.' })
    }

    // Return error if full name not provided
    if (!pseudo) {
      return this.res.status(422).send({ error: 'You must enter your pseudo.' })
    }

    // Return error if no password provided
    if (!password) {
      return this.res.status(422).send({ error: 'You must enter a password.' })
    }

    User.findOne({ where: { email } }).then((existingUser: User) => {
      // If user is not unique, return error
      if (existingUser) {
        return this.res.status(422).send({ error: 'That email address is already in use.' })
      }

      // If email is unique and password was provided, create account
      const user = new User()
      user.set('email', email)
      user.set('password', password)
      user.set('pseudo', pseudo)
      user.save().then((user) => {
        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

        const userInfo = this.setUserInfo(user)

        this.res.status(201).json({
          token: 'JWT ' + this.generateToken(userInfo),
          user: userInfo,
        })
      })
        .catch((error) => {
          return next(error)
        })
    })
      .catch((error) => {
        return next(error)
      })
  }
}

