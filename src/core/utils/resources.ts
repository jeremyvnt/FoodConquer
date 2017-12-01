import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, UserResource } from '../../models'
import { Model } from 'sequelize-typescript'
import { maxStokage, baseProduction, moneyUptake } from './formula'



export class ResourcesService {

  private getProductionBuildingId(resource: string): string {
    let buildingId: string
    switch (resource) {
      case Resources.CEREAL.toString():
        buildingId = 'Champs'
        break
      case Resources.MEAT.toString():
        buildingId = 'Betail'
        break
      case Resources.WATER.toString():
        buildingId = 'Puits'
        break
      case Resources.MONEY.toString():
        buildingId = 'Mine'
        break
    }
    return buildingId
  }
  private getStockageBuildingId(resource: string): string {
    let buildingId: string
    switch (resource) {
      case Resources.CEREAL.toString():
        buildingId = 'Silot'
        break
      case Resources.MEAT.toString():
        buildingId = 'Entrepot'
        break
      case Resources.WATER.toString():
        buildingId = 'Citerne'
        break
    }
    return buildingId
  }
  private getResourceFromBuildingId(buildingId: string): Resources {
    let resources: Resources
    switch (buildingId) {
      case 'Champs':
        resources = Resources.CEREAL
        break
      case 'Betail':
        resources = Resources.MEAT
        break
      case 'Puits':
        resources = Resources.WATER
        break
      case 'Mine':
        resources = Resources.MONEY
        break
    }
    return resources
  }


  public async getUserResources(user: User) {
    const userRequirements = <UserRequirement[]>await user.$get(
      'requirements',
      {
        where: {
          Requirementid: ['Champs', 'Betail', 'Puits', 'Mine'],
        },
      },
    )

    const userResources = <UserResource[]>await user.$get('resources')

    const resources: any[] = []
    let totalMoneyUptake = 0

    userRequirements.forEach((userRequirement) => {
      totalMoneyUptake += moneyUptake(userRequirement)
    })

    await Promise.all(userResources.map(async (userResource) => {

      const userRequirement = userRequirements.find((value) => {
        return value.requirementId === this.getProductionBuildingId(
          userResource.resource,
        )
      })

      if (userRequirement) {

        let quantity = this.calculUserResource(user, userResource, userRequirement)
        const production = baseProduction(userResource.resource, userRequirement.level)
        let max: number

        if (userResource.resource === Resources.MONEY.toString()) {
          quantity -= totalMoneyUptake
        } else {
          max = <number>await this.getStockageMaxResources(user, userResource)
          if (quantity > max)
            quantity = max
        }

        const resource = {
          quantity,
          production,
          max,
          name: userResource.resource,
        }

        resources.push(resource)
      }
    }))

    return resources
  }

  private calculUserResource(user: User,
                             userResource: UserResource,
                             userRequirement: UserRequirement): number {

    let quantity: number
    if (userResource.resource !== Resources.MONEY.toString()) {
      quantity = this.calculUserBaseResource(user, userResource, userRequirement)
    } else {
      quantity = this.calculUserSpecialResource(userResource, userRequirement)
    }

    return Math.round(quantity)
  }

  private calculUserBaseResource(user: User,
                                 userResource: UserResource,
                                 userRequirement: UserRequirement): number {

    const resource: Resources = this.getResourceFromBuildingId(userRequirement.requirementId)
    let quantity = userResource.quantity

    if (userRequirement.updatedAt > new Date().valueOf()) {
      quantity += ((new Date().valueOf() - userResource.updatedAt) / 3600000) *
        baseProduction(resource.toString(), userRequirement.level - 1)
    } else {
      if (userResource.updatedAt < userRequirement.updatedAt) {
        quantity += ((new Date().valueOf() - userRequirement.updatedAt) / 3600000) *
          baseProduction(resource.toString(), userRequirement.level)
          + ((userRequirement.updatedAt - userResource.updatedAt) / 3600000) *
          baseProduction(resource.toString(), userRequirement.level - 1)
      } else {
        quantity += ((new Date().valueOf() - userResource.updatedAt) / 3600000) *
          baseProduction(resource.toString(), userRequirement.level)
      }
    }
    return quantity
  }

  private calculUserSpecialResource(userResource: UserResource,
                                    userRequirement: UserRequirement): number {

    let quantity: number = userResource.quantity
    const resource: Resources = this.getResourceFromBuildingId(userRequirement.requirementId)

    if (userRequirement.updatedAt > new Date().valueOf()) {
      quantity = baseProduction(resource.toString(), userRequirement.level - 1)
    } else {
      quantity = baseProduction(resource.toString(), userRequirement.level)
    }
    return quantity
  }


  private async getStockageMaxResources(user: User, userResource: UserResource) {
    const stockageBuilding = this.getStockageBuildingId(userResource.resource)
    let level = 0

    try {
      const userRequirement = <UserRequirement>await user.$get(
        'requirement',
        {
          where: {
            id: stockageBuilding,
          },
        },
      )
      level = userRequirement.level
    } catch (e) {

    }

    return maxStokage(level)
  }
}
