import { User, Requirement, UserRequirement, RequirementResource } from '../models'
import { ResourcesService } from '../core/game/resources/resources'
import { BaseController, Route, NextFunction } from './'

export class BuildingController extends BaseController {

  private basePath = '/building'
  private requirementType = 'BUILDING'

  static routes: Route[] = [
    { path: '/', action: 'index' },
    { verb: 'post', path: '/', action: 'createOrUpdate' },
  ]
  // niveau, temps de construction, ressource lvl après, image, description
	/**
	 * Action qui liste les différents buildings
	 * 
	 * @param {NextFunction} next 
	 * @memberof BuildingController
	 */
  public index(next: NextFunction) {
    this.getRequirementList(next, this.requirementType)
  }

  /**
   * Action qui améliore ou créé un batiment
   * 
   * @param {NextFunction} next 
   * @memberof BuildingController
   */
  public createOrUpdate(next: NextFunction) {
    console.log(this.req.body)
    // const requirement = new Todo(this.req.body)
    const requirementIdentifier = this.req.body.requirement.id

    User.findOne<User>({ where: { pseudo: 'Jerem' } }).then((user) => {
      UserRequirement.findOne<UserRequirement>({
        where: {
          userId: user.id,
          requirementId: requirementIdentifier,
        },
        include: [{
          model: Requirement,
          where: { type: this.requirementType },
          include: [{
            model: RequirementResource,
          }],
        }],
      }).then((ur) => {
        if (ur) {
          // update
          // set new value on ur object
          ur.update({
            updatedAt: new Date().valueOf(),
            // + methode qui calcule la temps de construction en fonction du level
            level: ur.level + 1,
          }).then(() => {
            this.res.redirect(200, this.basePath)
          }).catch(next)
        }
        // create
        const newUserRequirement = new UserRequirement(user.id, requirementIdentifier)
        newUserRequirement.save().then(() => {
          this.res.redirect(200, this.basePath)
        }).catch(next)
      })
    })
  }
}
