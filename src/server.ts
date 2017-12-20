import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import methodOverride = require('method-override')

import * as passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { secret } from './boot'
import { UserService } from './core/utils/user'
import { User } from './models'

const localOptions = { usernameField: 'email' }
const userService = new UserService()

import {
  TestController,
  BuildingController,
  ResearchController,
  UnitController,
  AuthenticationController,
  PassportController,
} from './controllers'

/**
 * Les options de lancement du serveur
 * 
 * @interface ServerOptions
 */
interface ServerOptions {
  /**
   * Le port sur lequel le serveur devra se lancer (8080 par défaut)
   * 
   * @readonly
   * @type {number}
   */
  readonly port?: number
}

/**
 *  Create our web server
 * 
 * @export
 * @class Server
 */
export class Server {

  /**
   * Les options qui ont été définies pour ce serveur
   * 
   * @type {ServerOptions}
   * @memberof Server
   */
  public options: ServerOptions


  /**
   * Représente l'application Express du serveur
   * 
   * @type {express.Application}
   * @memberof Server
   */
  public app: express.Application

  /**
   * Creates an instance of Server.
   * En typescript, on peut passer des valeurs par défaut au paramètres d'une fonction
   * @param {ServerOptions} [options={}] 
   * @memberof Server
   */
  constructor(options: ServerOptions = {}) {
    const defaults: ServerOptions = {
      port: 8080,
    }

    this.options = { ...defaults, ...options }

    this.app = express()

    this.useInitialMiddlewares()

    this.usePassportMiddlewares()

    this.useControllersRouting()

    this.useFallbackMiddlewares()
  }

  /**
   * Configuration initiale des middleware
   * 
   * @memberof Server
   */
  public useInitialMiddlewares() {
    // Si vous lancez le projet depuis VSCode il vous faut rajouter
    // `"outputCapture": "std"` dans votre configuration du `.vscode/launch.json`
    // Car morgan log sur stdout par defaut qui n'est pas affiché dans la console de débogage
    this.app.use(logger('dev'))

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded())

    this.app.use(cookieParser('ajksdhfdskdqsdfasdklafvcbvckjhfjka sdf'))

    this.app.use(methodOverride())
    this.app.use(passport.initialize())
    this.app.use(passport.session())
  }

  /**
   * Add some fallback middlewares to the response
   * 
   * @memberof Server
   */
  public useFallbackMiddlewares() {
    this.app.use(this.notFoundMiddleware)
    this.app.use(this.errorMiddleware)
  }


  /**
   * Add some fallback middlewares to the response
   * 
   * @memberof Server
   */
  public usePassportMiddlewares() {
    // Authentication
    // Setting up local login strategy
    const localLogin = new LocalStrategy(localOptions, ((email: string, password: string, done: any) => {
      User.findOne({ where: { email } }).then((user: User) => {
        if (!user)
          return done(null, false, { message: 'Your login details could not be verified. Please try again.' })

        userService.comparePassword(user, password, ((err: Error, isMatch: boolean) => {
          if (err)
            return done(err)
          if (!isMatch)
            return done(
              null,
              false,
              { message: 'Your login details could not be verified. Please try again.' },
            )

          return done(null, user)
        }))
      })
        .catch((error) => {
          return done(error)
        })
    }))

    const jwtOptions = {
      // Telling Passport to check authorization headers for JWT
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Telling Passport where to find the secret
      secretOrKey: secret,
    }

    // Setting up JWT login strategy
    const jwtLogin = new JwtStrategy(jwtOptions, ((payload: any, done: any) => {
      User.findById(payload._id)
        .then((user: User) => {
          if (user) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
        .catch((error) => {
          return done(error, false)
        })
    }))

    passport.use(jwtLogin)
    passport.use(localLogin)
  }

  /**
   * Connection du routing des controllers à l'application
   * 
   * @memberof Server
   */
  public useControllersRouting() {
    const router = express.Router()

    // CORS configuration
    const options: cors.CorsOptions = {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '*',
      preflightContinue: false,
    }
    router.use(cors(options))

    // Les différents controllers
    // @todo, possible d'utiliser une boucle ici si on indexe tous nos controllers dans le fichier
    // ./controllers/index.js (ce qui est le cas)
    // Cela éviterait de devoir tous les lister ici.

    AuthenticationController.connect(router)
    PassportController.connect(router)
    TestController.connect(router)
    BuildingController.connect(router)
    ResearchController.connect(router)
    UnitController.connect(router)

    router.options('*', cors(options))
    this.app.use(router)

  }

  /**
   * Lance le serveur Web
   * 
   * @memberof Server
   */
  public run() {
    this.app.listen(this.options.port, () => {
      console.log(`Started on port ${this.options.port}`)
    })
  }

  /**
   * Un middleware qui sera utiliser en dernier recours, si jamais aucun middleware auparavant
   * n'a géré la requête
   * 
   * @private
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   * @memberof Server
   */
  private notFoundMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    res.statusCode = 404
    res.end('Not found!!')
  }

  /**
   * Un middleware qui sera utiliser en dernier recours, si jamais aucun middleware auparavant
   * n'a géré la requête
   * 
   * @private
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   * @memberof Server
   */
  private errorMiddleware(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    res.status(err.statusCode || 500)
    /*if (err.code)
      res.statusMessage = err.code*/
    res.json({
      error: {
        message: err.message || 'Unknown error',
      },
    })
  }
}
