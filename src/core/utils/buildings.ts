import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, RequirementResource } from '../../models'
import { Model } from 'sequelize-typescript'
import { buildingTime } from './formula'

export class BuildingService {

  public async getBuildingTime(user: User, userRequirement: UserRequirement) {

    let portugaisLevel = 0
    let artisantLevel = 0

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

    return buildingTime(
      cerealCost.cost,
      meatCost.cost,
      userRequirement.level,
      portugaisLevel,
      artisantLevel,
    )

  }

  /**
   * 
   * Get updated date when building gonna be build
   * 
   * @param {User} user 
   * @param {UserRequirement} userRequirement 
   * @returns number : timestamp
   * @memberof BuildingService
   */
  public async getNextUpdatedDate(user: User, userRequirement: UserRequirement) {
    return Date().valueOf() + this.getBuildingTime(user, userRequirement)
  }

}
