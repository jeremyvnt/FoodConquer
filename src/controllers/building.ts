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
    { verb: 'get', path: '/:buildingId', action: 'details' },
    { verb: 'post', path: '/:buildingId', action: 'createOrUpdate' },
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

    const requirement = await Requirement.findOne<Requirement>(
      {
        where: {
          id: buildingId,
        },
      },
    )
    const userRequirement = <UserRequirement[]>await requirement.$get(
      'userRequirements',
      {
        where: {
          userId: user.id,
        },
      },
    )

    const level = userRequirement.length ? userRequirement[0].level : 0
    const updatedAt = userRequirement.length ? userRequirement[0].updatedAt : 0

    const cost = await this.buildingService.getUpgradeCost(user, requirement, level)
    const buildDuration = await this.buildingService.getBuildingTime(
      user,
      cost[Resources.CEREAL],
      cost[Resources.MEAT],
    )

    const { id, name, description, type, levelMax } = requirement
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
    const requirementIdentifier = this.req.params.buildingId
    // const requirementIdentifier = 'Puits'

    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })

    const userRequirement = (<UserRequirement[]>await user.$get(
      'requirements',
      {
        where: {
          requirementId: requirementIdentifier,
        },
        include: [{
          model: Requirement,
          where: {
            type: this.requirementType,
          },
        }],
      },
    ))

    if (userRequirement) {
      await this.buildingService.upgradeBuilding(user, userRequirement[0])
        .then((userRequirementUpdated) => {
          this.res.status(200)
          this.res.json({
            data: userRequirementUpdated,
          })
        })
    } else {
      // userRequirement doesn't exist we create it WITH SERVICE METHOD [WIP]
      await this.buildingService.createBuilding(user, requirementIdentifier)
      newUserRequirement.save().then(() => {
        this.res.status(200)
      }).catch(next)
    }
  }
}

