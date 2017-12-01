import { User, Requirement, UserRequirement, RequirementResource } from '../models'
import { ResourcesService } from '../core/utils/resources'
import { BuildingService } from './../core/utils/buildings'
import { BaseController, Route, NextFunction } from './'

export class BuildingController extends BaseController {

  static basePath = '/building'
  private requirementType = 'BUILDING'
  private buildingService = new BuildingService()

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
  public async createOrUpdate(next: NextFunction) {
    console.log(this.req.body)
    const requirementIdentifier = this.req.body.requirement.id

    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })

    try {
      const userRequirement = await UserRequirement.findOne<UserRequirement>({
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
      })

      // userRequirement exist so we update it
      await userRequirement.update({
        updatedAt: await this.buildingService.getNextUpdatedDate(user, userRequirement),
        level: userRequirement.level + 1,
      }).then(() => {
        this.res.redirect(200, BuildingController.basePath)
      }).catch(next)
    } catch (e) {
      // userRequirement doesn't exist we create it
      const newUserRequirement = new UserRequirement(user.id, requirementIdentifier)
      newUserRequirement.save().then(() => {
        this.res.redirect(200, BuildingController.basePath)
      }).catch(next)
    }
  }
}

