import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, RequirementResource, UserResource } from '../../models'
import { UserRequirementRepository } from '../../objects/models/repositories/UserRequirementRepository'
import { Model, Sequelize } from 'sequelize-typescript'
import { buildingTime, researchTime } from './formula'
import { ResourcesService } from './resources'
import { PreconditionFailedError } from '../../errors'
import { TECH_TREE } from '../../objects/techTree'

export class RequirementService {

  urRepository: UserRequirementRepository

  constructor() {
    this.urRepository = new UserRequirementRepository()
  }

  public async getBuildingTime(user: User, cerealCost: number = 0, meatCost: number = 0) {

    const portugaisLevel = await this.urRepository.getUserRequirementLevel(user, 'portugais')
    const artisantLevel = await this.urRepository.getUserRequirementLevel(user, 'artisant')

    return buildingTime(
      cerealCost,
      meatCost,
      portugaisLevel,
      artisantLevel,
    )
  }


  public async upgradeRequirement(user: User, userRequirement: UserRequirement) {

    if (userRequirement.updatedAt > new Date().valueOf())
      return false

    const resourcesService = new ResourcesService()
    const userResources = await resourcesService.getUserResources(user)
    const cost = await resourcesService.getUpgradeCost(
      user,
      userRequirement.requirement,
      userRequirement.level,
    )

    const buildingTime = userRequirement.requirement.type === 'BUILDING' ?
      await this.getBuildingTime(
        user,
        cost[Resources.CEREAL],
        cost[Resources.MEAT],
      ) :
      await this.getResearchTime(
        user,
        cost[Resources.CEREAL],
        cost[Resources.MEAT],
      )



    if (!await this.hasRequirements(user, userRequirement.requirement.id))
      throw new PreconditionFailedError('Needs some requirements')

    if (!resourcesService.hasEnoughResources(userResources, cost))
      throw new PreconditionFailedError('Not enougth resources')

    await resourcesService.withdrawResources(user, userResources, cost)

    userRequirement.set('level', userRequirement.level + 1)
    userRequirement.set('updatedAt', new Date().valueOf() + buildingTime * 3600000)
    userRequirement.save()
  }


  public async hasRequirements(user: User, objectId: string) {
    const requirementsTree = TECH_TREE[objectId]
    for (const entrie in requirementsTree) {
      const userRequirement = <UserRequirement[]>await user.$get(
        'requirements',
        {
          where: {
            requirementId: entrie,
            level: {
              [Sequelize.Op.gte]: requirementsTree[entrie],
            },
          },
        },
      )
      if (!userRequirement.length)
        return false
    }

    return true
  }


  public async createRequirement(user: User, requirementId: string) {
    const requirement = await Requirement.findOne<Requirement>({ where: { id: requirementId } })

    if (!await this.hasRequirements(user, requirement.id))
      throw new PreconditionFailedError('Needs some requirements')

    const resourcesService = new ResourcesService()
    const userResources = await resourcesService.getUserResources(user)
    const cost = await resourcesService.getUpgradeCost(user, requirement, 0)
    const buildingTime = requirement.type === 'BUILDING' ?
      await this.getBuildingTime(
        user,
        cost[Resources.CEREAL],
        cost[Resources.MEAT],
      ) :
      await this.getResearchTime(
        user,
        cost[Resources.CEREAL],
        cost[Resources.MEAT],
      )

    if (!resourcesService.hasEnoughResources(userResources, cost))
      throw new PreconditionFailedError('Not enougth resources')

    await resourcesService.withdrawResources(user, userResources, cost)

    const newUserRequirement = new UserRequirement()

    newUserRequirement.set('level', 1)
    newUserRequirement.set('updatedAt', new Date().valueOf() + buildingTime * 3600000)
    newUserRequirement.set('requirementId', requirement.id)
    newUserRequirement.set('userId', user.id)
    newUserRequirement.save()
  }


  public async getResearchTime(user: User, cerealCost: number, meatCost: number) {
    const laboratoireLevel = await this.urRepository.getUserRequirementLevel(user, 'laboratoire')

    return researchTime(
      cerealCost,
      meatCost,
      laboratoireLevel,
    )
  }
}
