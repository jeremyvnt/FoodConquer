
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
    { verb: 'post', path: '/:id', action: 'createOrUpdate' },
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
        include: [{
          model: Requirement,
          where: {
            type: this.requirementType,
          },
        }],
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

    const requirementIdentifier = this.req.params.id
    
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


    if (userRequirement.length) {
      await this.buildingService.upgradeBuilding(user, userRequirement[0])
      this.res.redirect(200, BuildingController.basePath)      
    } else {
      // userRequirement doesn't exist we create it
      await this.buildingService.createBuilding(user, requirementIdentifier)
        .then(() => {
          this.res.redirect(200, BuildingController.basePath)
        }).catch(next)      
    }
  
    
  }
}

