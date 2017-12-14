import { Resources } from './../objects/resource'
import { User, Requirement, UserRequirement, RequirementResource } from '../models'
import { UserRequirementRepository } from '../objects/models/repositories/UserRequirementRepository'
import { ResourcesService } from '../core/utils/resources'
import { BaseController, Route, NextFunction } from './'

export class ResearchController extends BaseController {

  static basePath = '/research'
  private requirementType = 'RESEARCH'

  static routes: Route[] = [
    { path: '/', action: 'index' },
    { verb: 'get', path: '/:researchId', action: 'details' },
    { verb: 'post', path: '/:researchId', action: 'createOrUpdate' },
  ]

	/**
	 * Action qui liste les différentes recherches
	 * 
	 * @param {NextFunction} next 
	 * @memberof ResearchController
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
    const urRepository = new UserRequirementRepository()
    const researchId = this.req.params.researchId

    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
    const requirement = await Requirement.findOne<Requirement>({ where: { id: researchId }})
    const userRequirement = await urRepository.findOneUserRequirement(user, researchId)

    const level = userRequirement ? userRequirement.level : 0
    const updatedAt = userRequirement ? userRequirement.updatedAt : 0


    const cost = await this.resourcesService.getUpgradeCost(user, requirement, level)
    const researchDuration = await this.requirementService.getResearchTime(
      user,
      cost[Resources.CEREAL],
      cost[Resources.MEAT],
    )

    const { id, name, description, type, levelMax } = requirement
    const research = { id, name, type, description, levelMax, level, updatedAt, cost, researchDuration }
    this.res.json(research)
  }

  /**
   * Action qui améliore ou créé une recherche
   * 
   * @param {NextFunction} next 
   * @memberof BuildingController
   */
  public async createOrUpdate(next: NextFunction) {
    const urRepository = new UserRequirementRepository()
    const requirementIdentifier = this.req.params.researchId

    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
    const userRequirement = await urRepository.findOneUserRequirement(user, requirementIdentifier)
    if (userRequirement) {
      await this.requirementService.upgradeRequirement(user, userRequirement)
      this.res.redirect(200, ResearchController.basePath)
    } else {
      await this.requirementService.createRequirement(user, requirementIdentifier)
      this.res.redirect(200, ResearchController.basePath)
    }
  }
}
