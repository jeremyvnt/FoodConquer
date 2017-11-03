import { Request, Response, NextFunction, Router, IRouterMatcher } from 'express'
export { NextFunction }

/**
 * Définition de la configuration d'une Route
 * 
 * @export
 * @interface Route
 */
export interface Route {
  /**
   * Quel pattern cette route doit-elle matcher
   * 
   * @type {string}
   */
  path: string | RegExp,

  /**
   * L'action correspondante dans le controller
   * 
   * @type {string}
   */
  action: string,

  /**
   * Le verbe HTTP
   * 
   * @type {string}
   */
  verb?: string,

  /**
   * Permet d'ignorer le basePath
   * 
   * @type {boolean}
   */
  root?: boolean,
}

/**
 * Notre classe de base pour tout controller, elle gère la création d'instance à chaque requête
 * 
 * @export
 * @abstract
 * @class BaseController
 */
export abstract class BaseController {
  /**
   * La définition des routes pour ce controller
   * 
   * @static
   * @type {Route[]}
   * @memberof BaseController
   */
  static routes: Route[] = []

  /**
   * Prefixe tout les path de nos route par ce path
   * 
   * @static
   * @type {string}
   * @memberof BaseController
   */
  static basePath: string = ''

  
  /**
   * La requête
   * 
   * @type {Request}
   * @memberof BaseController
   */
  req: Request

  /**
   * La réponse
   * 
   * @type {Response}
   * @memberof BaseController
   */
  res: Response

  /**
   * Creates an instance of BaseController.
   * 
   * An instance of a controller handles a single request, therefor it needs the req and res as
   * parameters
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @memberof BaseController
   */
  constructor (req: Request, res: Response) {
    this.req = req
    this.res = res
  }

  /**
   * La méthode qui permet de connecter un controller au router de notre application.
   * Elle s'occupe d'ajouter les routes et de créer une instance du controller lorsqu'une requête
   * arrive.
   * 
   * @static
   * @param {Router} router 
   * @memberof BaseController
   */
  static connect(router: Router): void {
    for (const idx in this.routes) {
      const route = this.routes[idx]

      // Verbe par défaut est GET
      const verb = route.verb || 'get'

      // Le path est préfixé du basePath seulement si l'option root n'est pas à true sur la Route
      const path = (!route.root && this.basePath || '') + route.path

      // On whitelist au cas où les verbes possibles
      if (['all', 'post', 'get', 'patch', 'put', 'delete'].indexOf(verb) === -1) {
        throw new Error('Incorrect verb for: ' + verb)
      }

      // On whitelist également les actions, donc on vérifie que leur type est bien une fonction
      // Ici on vérifie donc sur le prototype car les actions sont des méthodes d'instances
      if (typeof (<any>this.prototype)[route.action] !== 'function') {
        throw new Error('Incorrect verb for: ' + verb)
      }

      // Ici on sait que verb est une méthode qui existe dans le router
      // mais en utilisant les crochets on y référence pas directement et typescript ne sait donc
      // pas de quoi on parle. Du coup on cast explicitement le router en `any`, ce qui nous permet
      // de faire le `router[verb]`. Finalement, dernière étape, on indique explicitement le type
      // de sortie qui est `<IRouterMatcher<Router>>`, le type utilisé par `router.get`,
      // `router.post`, etc...
      // Cette astuce nous permet de conserver le typage sur la méthode à utiliser
      //
      // Enfin, on appelle cette méthode avec le path, et la méthode de callback.
      (<IRouterMatcher<Router>>(<any>router)[verb])(path, (
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        // Petit hack car on ne peut pas instancier une instance d'une classe fille depuis une
        // méthode statique, en effet, on n'a aucun moyen simple de connaitre le type de la classe
        // fille depuis cette classe parente.
        // C'est pourquoi on dit explicipement que this peut être de n'importe quel type qui hérite
        // de notre classe.
        const childController = new (<any>this)(req, res)

        // On appelle la bonne action dans le controller enfant
        childController[route.action](next)
      })
      
    }
  }
}
