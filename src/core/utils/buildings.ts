import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, RequirementResource, UserResource } from '../../models'
import { Model } from 'sequelize-typescript'
import { buildingTime, upgradeCost } from './formula'
import { ResourcesService } from './resources'

export class BuildingService {

  public async getBuildingTime(user: User, cerealCost: number, meatCost: number) {

    let portugaisLevel = 0
    let artisantLevel = 0

    try {
      const portugaisRequirement = (<UserRequirement[]>await user.$get(
        'requirements',
        {
          where: {
            requirementId: 'Portugais',
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
            RequirementId: 'Portugais',
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
    const resourcesService = new ResourcesService()
    const userResources = await resourcesService.getUserResources(user)
    const upgradeCost = await this.getUpgradeCost(user, userRequirement.requirement, userRequirement.level)
    const buildingTime = await this.getBuildingTime(
      user, 
      upgradeCost[Resources.CEREAL], 
      upgradeCost[Resources.MEAT],
    )


    for (const resource in upgradeCost) {
      const cost = upgradeCost[resource]
      const userResource = userResources.find((userResource) => {
        return userResource.name === resource
      })
      if (userResource.quantity < cost)
        return false
    }

    for (const resource in upgradeCost) {
      const cost = upgradeCost[resource]
      const quantity = userResources.find((userResource) => {
        return userResource.name === resource
      }).quantity
      const userResource = (<UserResource[]>await user.$get(
        'resources',
        {
          where: {
            resource,
          },
        },
      ))[0]

      userResource.set('quantity', quantity - cost)
      userResource.set('updatedAt', new Date().valueOf())
      userResource.save()
    }
    userRequirement.set('level', userRequirement.level + 1)
    userRequirement.set('updatedAt', new Date().valueOf() + buildingTime * 3600000)
    userRequirement.save()
  }
}
