import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, UserResource } from '../../models'
import { Model } from 'sequelize-typescript'
import { maxStokage, baseProduction, moneyUptake } from './formula'



export class ResourcesService {

  private getProductionBuildingId(resource: string): string {
    let buildingId: string
    switch (resource) {
      case Resources.CEREAL.toString():
        buildingId = 'champs'
        break
      case Resources.MEAT.toString():
        buildingId = 'betail'
        break
      case Resources.WATER.toString():
        buildingId = 'puits'
        break
      case Resources.MONEY.toString():
        buildingId = 'mine'
        break
    }
    return buildingId
  }
  private getStockageBuildingId(resource: string): string {
    let buildingId: string
    switch (resource) {
      case Resources.CEREAL.toString():
        buildingId = 'silot'
        break
      case Resources.MEAT.toString():
        buildingId = 'entrepot'
        break
      case Resources.WATER.toString():
        buildingId = 'citerne'
        break
    }
    return buildingId
  }
  private getResourceFromBuildingId(buildingId: string): Resources {
    let resources: Resources
    switch (buildingId) {
      case 'champs':
        resources = Resources.CEREAL
        break
      case 'betail':
        resources = Resources.MEAT
        break
      case 'puits':
        resources = Resources.WATER
        break
      case 'mine':
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
          Requirementid: ['champs', 'betail', 'puits', 'mine'],
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

      let quantity = 0
      let production = 0
      let max: number

      quantity = this.calculUserResource(user, userResource, userRequirement)
      production = baseProduction(userResource.resource, userRequirement ? userRequirement.level : 0)

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
    }))

    return resources
  }

  private calculUserResource(user: User,
                             userResource: UserResource,
                             userRequirement?: UserRequirement): number {

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
                                 userRequirement?: UserRequirement): number {

    const resource = userResource.resource
    let quantity = userResource.quantity

    if (userRequirement && userRequirement.updatedAt > new Date().valueOf()) {
      quantity += ((new Date().valueOf() - userResource.updatedAt) / 3600000) *
        baseProduction(resource, userRequirement.level - 1)
    } else {
      if (userRequirement && userResource.updatedAt < userRequirement.updatedAt) {
        quantity += ((new Date().valueOf() - userRequirement.updatedAt) / 3600000) *
          baseProduction(resource, userRequirement.level)
          + ((userRequirement.updatedAt - userResource.updatedAt) / 3600000) *
          baseProduction(resource, userRequirement.level - 1)
      } else {
        quantity += ((new Date().valueOf() - userResource.updatedAt) / 3600000) *
          baseProduction(resource, userRequirement ? userRequirement.level : 0)
      }
    }

    return quantity
  }

  private calculUserSpecialResource(userResource: UserResource,
                                    userRequirement?: UserRequirement): number {

    const resource = userResource.resource
    let quantity: number = userResource.quantity

    if (userRequirement && userRequirement.updatedAt > new Date().valueOf()) {
      quantity = baseProduction(resource.toString(), userRequirement.level - 1)
    } else {
      quantity = baseProduction(resource.toString(), userRequirement ? userRequirement.level : 0)
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
