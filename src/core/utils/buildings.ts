import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, RequirementResource, UserResource } from '../../models'
import { Model, Sequelize } from 'sequelize-typescript'
import { buildingTime, upgradeCost } from './formula'
import { ResourcesService } from './resources'
import { TECH_TREE } from '../../objects/techTree'

export class BuildingService {

  public async getBuildingTime(user: User, cerealCost: number, meatCost: number) {

    let portugaisLevel = 0
    let artisantLevel = 0

    try {
      const portugaisRequirement = (<UserRequirement[]>await user.$get(
        'requirements',
        {
          where: {
            requirementId: 'portugais',
          },
        },
      ))[0]
      portugaisLevel = portugaisRequirement.level
    } catch (e) {

    }

    try {
      const artisantRequirement = (<UserRequirement[]>await user.$get(
        'requirements',
        {
          where: {
            RequirementId: 'portugais',
          },
        },
      ))[0]
      artisantLevel = artisantRequirement.level
    } catch (e) {

    }


    return buildingTime(
      cerealCost,
      meatCost,
      portugaisLevel,
      artisantLevel,
    )
  }

  public async getUpgradeCost(user: User, requirement: Requirement, level: number) {
    
    const cerealCost = (<RequirementResource[]>await requirement.$get(
      'resources',
      {
        where: {
          resourceId: Resources.CEREAL,
        },
      },
    ))[0]

    const meatCost = (<RequirementResource[]>await requirement.$get(
      'resources',
      {
        where: {
          resourceId: Resources.MEAT,
        },
      },
    ))[0]

    const waterCost = (<RequirementResource[]>await requirement.$get(
      'resources',
      {
        where: {
          resourceId: Resources.WATER,
        },
      },
    ))[0]

    return upgradeCost(cerealCost.cost, meatCost.cost, waterCost.cost, requirement, level)
  }




  public async upgradeBuilding(user: User, userRequirement: UserRequirement) {
    
    if (userRequirement.updatedAt > new Date().valueOf())
      return false

    const resourcesService = new ResourcesService()
    const userResources = await resourcesService.getUserResources(user)
    const cost = await this.getUpgradeCost(user, userRequirement.requirement, userRequirement.level)

    const buildingTime = await this.getBuildingTime(
      user, 
      cost[Resources.CEREAL], 
      cost[Resources.MEAT],
    )
    
    if (!await this.hasRequirements(user, userRequirement.requirement))
      throw new Error('Needs some requirements')      

    if (!resourcesService.hasEnoughResources(userResources, cost))
      throw new Error('Not enougth resources')

    await resourcesService.withdrawResources(user, userResources, cost)

    userRequirement.set('level', userRequirement.level + 1)
    userRequirement.set('updatedAt', new Date().valueOf() + buildingTime * 3600000)
    userRequirement.save()
  }


  public async hasRequirements(user: User, requirement: Requirement) {
    const requirementsTree = TECH_TREE.get(requirement.id)
    console.log(JSON.stringify(requirementsTree))
    for (const entrie of requirementsTree) {
      const userRequirement = <UserRequirement[]> await user.$get(
        'requirements',
        {
          where: {
            requirementId: entrie[0],
            level: {
              [Sequelize.Op.gte]: entrie[1],
            },
          },
        },
      )
      if (!userRequirement.length)
        return false
    }

    return true
  }



  public async createBuilding(user: User, requirementId: string) {
    const requirement = await Requirement.findOne<Requirement>({ where: { id: requirementId } })
   
    const resourcesService = new ResourcesService()
    const userResources = await resourcesService.getUserResources(user)
    const cost = await this.getUpgradeCost(user, requirement, 0)
    const buildingTime = await this.getBuildingTime(
      user, 
      cost[Resources.CEREAL], 
      cost[Resources.MEAT],
    )

    if (!resourcesService.hasEnoughResources(userResources, cost))
      throw new Error('Not enougth resources')

    await resourcesService.withdrawResources(user, userResources, cost)

    const newUserRequirement = new UserRequirement()

    newUserRequirement.$set('requirement', requirement)
    newUserRequirement.$set('user', user)
    newUserRequirement.set('level', 1)
    newUserRequirement.set('updatedAt', new Date().valueOf() + buildingTime * 3600000)

    newUserRequirement.save()
  }
}
