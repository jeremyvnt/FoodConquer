import { Resources } from './../objects/resource'
import { buildingTime } from './../core/utils/formula'
import { User, Requirement, UserRequirement, RequirementResource } from '../models'
import { UserRequirementRepository } from '../objects/models/repositories/UserRequirementRepository'
import { ResourcesService } from '../core/utils/resources'
import { RequirementService } from './../core/utils/requirements'
import { BaseController, Route, NextFunction } from './'

export class BuildingController extends BaseController {

  static basePath = '/building'
  private requirementType = 'BUILDING'

  static routes: Route[] = [
    { path: '/', action: 'index' },
    { verb: 'get', path: '/:buildingId', action: 'details' },
    { verb: 'post', path: '/:buildingId', action: 'createOrUpdate' },
  ]

	/**
	 * Action qui liste les différents buildings
	 * 
	 * @param {NextFunction} next
	 * @memberof BuildingController
	 */
  public async index(next: NextFunction) {
    try {
      const result = await this.getRequirementList(next, this.requirementType)
      this.res.json(result)
    } catch (error) {
      next(error)
    }
  }

	/**
	 * Action qui liste les différents buildings
	 * 
	 * @param {NextFunction} next
	 * @memberof BuildingController
	 */
  public async details(next: NextFunction) {
    const urRepository = new UserRequirementRepository()
    const buildingId = this.req.params.buildingId
    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
    const requirement = await Requirement.findOne<Requirement>({ where: { id: buildingId } })
    const userRequirement = await urRepository.findOneUserRequirement(user, buildingId)

    const level = userRequirement ? userRequirement.level : 0
    const updatedAt = userRequirement ? userRequirement.updatedAt : 0

    const cost = await this.resourcesService.getUpgradeCost(user, requirement, level)
    const buildDuration = await this.requirementService.getBuildingTime(
      user,
      cost[Resources.CEREAL],
      cost[Resources.MEAT],
    )

    const { id, name, description, type, levelMax } = requirement
    const building = { id, name, type, description, levelMax, level, updatedAt, cost, buildDuration }
    return building
  }

  /**
   * Action qui améliore ou créé un batiment
   * 
   * @param {NextFunction} next 
   * @memberof BuildingController
   */
  public async createOrUpdate(next: NextFunction) {
    const urRepository = new UserRequirementRepository()
    const requirementIdentifier = this.req.params.buildingId

    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
    const userRequirement = await urRepository.findOneUserRequirement(user, requirementIdentifier)

    try {
      if (userRequirement)
        await this.requirementService.upgradeRequirement(user, userRequirement)
      else
        await this.requirementService.createRequirement(user, requirementIdentifier)
      this.res.redirect(200, BuildingController.basePath)
    } catch (error) {
      next(error)
    }
  }
}

