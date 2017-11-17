import { User, Requirement, UserRequirement } from '../models'
import { ResourcesService } from '../core/game/resources/resources'
import { BaseController, Route, NextFunction } from './'

export class BuildingController extends BaseController {

  static basePath = '/building'

  static routes: Route[] = [
    { path: '/', action: 'index' },
    { verb: 'post', path: '/', action: 'create' },
  ]
  // niveau, temps de construction, ressource lvl après, image, description
	/**
	 * Action qui liste les différents buildings
	 * 
	 * @param {NextFunction} next 
	 * @memberof TodoController
	 */
  public index(next: NextFunction) {
    // Get current user (grâce à Passport)
    User.findOne<User>({ where: { pseudo: 'Jerem' } }).then((user) => {
      UserRequirement.findAll<UserRequirement>({
        where: {
          userId: user.id,
        },
        include: [{
          model: Requirement,
          where: { type: 'BUILDING' },
        }],
      }).then((userRequirements) => {
        console.log('User Requirements: ', userRequirements)
        // merge le tableau de ressources avec userRequirements et return le tout
        ResourcesService.getGlobalProductionSpeed(user).then((globalSpeed) => {
          // merge globalSpeed avec userRequirements
          const result = Object.assign(
            {},
            { resources: globalSpeed },
            { buildings: userRequirements },
          )
          this.res.json(result)
        })
      })
    }).catch(next)
  }

	/**
	 * Action qui créé une Todo
	 * 
	 * @param {NextFunction} next 
	 * @memberof TodoController
	 */
  public create(next: NextFunction) {
    console.log(this.req.body)
    const todo = new Todo(this.req.body)

    todo.save().then(() => {
      this.res.json(todo)
    }).catch(next) // On oublie pas le catch !!!!!
  }
}
