import { Resources } from './../objects/resource'
import { buildingTime } from './../core/utils/formula'
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
    { path: '/:buildingId', action: 'details' },
    { verb: 'post', path: '/', action: 'createOrUpdate' },
  ]
  // niveau, temps de construction, ressource lvl après, image, description
	/**
	 * Action qui liste les différents buildings
	 * 
	 * @param {NextFunction} next
	 * @memberof BuildingController
	 */
  public async index(next: NextFunction) {
    const result = await this.getRequirementList(next, this.requirementType)
    this.res.json(result)
  }

	/**
	 * Action qui liste les différents buildings
	 * 
	 * @param {NextFunction} next
	 * @memberof BuildingController
	 */
  public async details(next: NextFunction) {
    const buildingId = this.req.params.buildingId

    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })

    const userRequirement = (<UserRequirement[]>await user.$get(
      'requirements',
      {
        where: {
          requirementId: buildingId,
        },
        include: [{
          model: Requirement,
          where: {
            type: this.requirementType,
          },
        }],
      },
    ))[0]

    const cost = await this.buildingService.getUpgradeCost(user, userRequirement)
    const buildDuration = await this.buildingService.getBuildingTime(
      user,
      cost[Resources.CEREAL],
      cost[Resources.MEAT],
    )

    const { level, updatedAt } = userRequirement
    const { id, name, description, type, levelMax } = userRequirement.requirement
    const building = { id, name, type, description, levelMax, level, updatedAt, cost, buildDuration }
    this.res.json(building)
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
      const userRequirement = <UserRequirement>await user.$get(
        'requirements',
        {
          where: {
            requirementId: requirementIdentifier,
          },
        },
      )

      // userRequirement exist so we update it
      const cost = await this.buildingService.getUpgradeCost(user, userRequirement)
      const buildDuration = await this.buildingService.getBuildingTime(
        user,
        cost[Resources.CEREAL],
        cost[Resources.MEAT],
      )

      userRequirement.update({
        updatedAt: Date().valueOf() + (buildDuration * 3600000),
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

