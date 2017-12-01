import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, RequirementResource } from '../../models'
import { Model } from 'sequelize-typescript'
import { buildingTime, upgradeCost } from './formula'

export class BuildingService {

  public async getBuildingTime(user: User, cerealCost: number, meatCost: number) {
    
    let portugaisLevel = 0
    let artisantLevel  = 0

    try {
      const portugaisRequirement = <UserRequirement>await user.$get(
        'requirements',
        {
          where: {
            RequirementId: 'Portugais',
          },
        },
      )
      portugaisLevel = portugaisRequirement.level
    } catch (e) {

    }

    try {
      const artisantRequirement = <UserRequirement>await user.$get(
        'requirements',
        {
          where: {
            RequirementId: 'Portugais',
          },
        },
      )
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

  public async getUpgradeCost(user: User, userRequirement: UserRequirement) {

    const requirement = <Requirement>await userRequirement.$get('requirement')
    const cerealCost = <RequirementResource>await requirement.$get(
      'resources',
      {
        where: {
          resource: Resources.CEREAL,
        },
      },
    )
    const meatCost = <RequirementResource>await requirement.$get(
      'resources',
      {
        where: {
          resource: Resources.MEAT,
        },
      },
    )
    const waterCost = <RequirementResource> await requirement.$get(
      'resources',
      {
        where: {
          resource: Resources.WATER,
        },
      },
    )

    return upgradeCost(cerealCost.cost, meatCost.cost, waterCost.cost, userRequirement)
  }
}
