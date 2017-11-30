import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import methodOverride = require('method-override')

import {
  TodoController,
  TestController,
  BuildingController,
  ResearchController,
} from './controllers/index'

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

    this.useControllersRouting()

    this.useFallbackMiddlewares()
  }

  /**
   * Configuration initiale des middleware
   * 
   * @memberof Server
   */
  public useInitialMiddlewares() {
    // this.app.set('views', path.join(__dirname, 'views'))
    // this.app.set('view engine', 'pug')

    // Si vous lancez le projet depuis VSCode il vous faut rajouter
    // `"outputCapture": "std"` dans votre configuration du `.vscode/launch.json`
    // Car morgan log sur stdout par defaut qui n'est pas affiché dans la console de débogage
    this.app.use(logger('dev'))

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded())

    this.app.use(cookieParser('ajksdhfdskdqsdfasdklafvcbvckjhfjka sdf'))

    this.app.use(methodOverride())
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
   * Connection du routing des controllers à l'application
   * 
   * @memberof Server
   */
  public useControllersRouting() {
    const router = express.Router()

    // Les différents controllers
    // @todo, possible d'utiliser une boucle ici si on indexe tous nos controllers dans le fichier
    // ./controllers/index.js (ce qui est le cas)
    // Cela éviterait de devoir tous les lister ici.
    TestController.connect(router)
    TodoController.connect(router)
    BuildingController.connect(router)
    ResearchController.connect(router)

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
    res.status(err.status || 500)
    res.json({
      error: {
        message: err.message || 'Unknown error',
      }
    })
  }
}
