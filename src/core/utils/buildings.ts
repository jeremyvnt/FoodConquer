import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, RequirementResource } from '../../models'
import { Model } from 'sequelize-typescript'
import { buildingTime, upgradeCost } from './formula'

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

  public async getUpgradeCost(user: User, userRequirement: UserRequirement) {

    const requirement = <Requirement>await userRequirement.$get('requirement')
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

    return upgradeCost(cerealCost.cost, meatCost.cost, waterCost.cost, userRequirement)
  }
}
