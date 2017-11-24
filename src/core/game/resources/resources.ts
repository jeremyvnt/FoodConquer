import { Resources } from '../../../objects/resource'
import { User, Resource, Requirement, UserRequirement, UserResource } from '../../../models'
import { Model } from 'sequelize-typescript'



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
        buildingId = 'Puit'
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
      case 'Puit':
        resources = Resources.WATER
        break
      case 'Mine':
        resources = Resources.MONEY
        break
    }
    return resources
  }


  private getBaseProduction(resource: string,
                            buildingLevel: number): number {

    let production: number

    switch (resource) {
      case Resources.CEREAL.toString():
        production = 30 * buildingLevel * 1.1 ** buildingLevel
        break
      case Resources.MEAT.toString():
      case Resources.MONEY.toString():
        production = 20 * buildingLevel * 1.1 ** buildingLevel
        break
      case Resources.WATER.toString():
        production = 10 * buildingLevel * 1.1 ** buildingLevel
        break
      default:
        production = 0
    }
    return Math.round(production)
  }



  public async getUserResources(user: User) {
    const userRequirements = <UserRequirement[]>await user.$get(
      'requirements',
      {
        where: {
          Requirementid: ['Champs', 'Betail', 'Puit'],
        },
      },
    )

    const userResources = <UserResource[]>await user.$get('resources')

    const resources: any[] = []
    let moneyUptake = 0

    userRequirements.forEach((userRequirement) => {
      moneyUptake += this.getMoneyUptake(userRequirement)
    })

    await Promise.all(userResources.map(async (userResource) => {

      const userRequirement = userRequirements.find((value) => {
        return value.requirementId === this.getProductionBuildingId(
          userResource.resource,
        )
      })

      if (userRequirement) {
        let quantity = await this.calculUserResource(user, userResource, userRequirement)
        const production = this.getBaseProduction(userResource.resource, userRequirement.level)

        if (userResource.resource === Resources.MONEY.toString()) {
          quantity -= moneyUptake
        }

        const resource = {
          quantity,
          production,
          name: userResource.resource,
        }

        resources.push(resource)
      }
    }))

    return resources
  }


  private getMoneyUptake(userRequirement: UserRequirement): number {
    let moneyUptake = 0

    switch (userRequirement.requirementId) {
      case 'Champs':
        moneyUptake = 10 * userRequirement.level * 1.1 ** userRequirement.level
        break
      case 'Betail':
        moneyUptake = 10 * userRequirement.level * 1.1 ** userRequirement.level
        break
      case 'Puit':
        moneyUptake = 10 * userRequirement.level * 1.1 ** userRequirement.level
        break
      default:
        moneyUptake = 0
        break
    }
    return Math.round(moneyUptake)
  }

  private async calculUserResource(user: User,
                                   userResource: UserResource,
                                   userRequirement: UserRequirement) {

    let quantity: number
    if (userResource.resource !== Resources.MONEY.toString()) {
      const max = await this.getStockageMaxResources(user, userResource)
      quantity = this.calculUserBaseResource(user, userResource, userRequirement)
      quantity = quantity > max ? max : quantity
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
        this.getBaseProduction(resource.toString(), userRequirement.level - 1)
    } else {
      if (userResource.updatedAt < userRequirement.updatedAt) {
        quantity += ((new Date().valueOf() - userRequirement.updatedAt) / 3600000) *
          this.getBaseProduction(resource.toString(), userRequirement.level)
          + ((userRequirement.updatedAt - userResource.updatedAt) / 3600000) *
          this.getBaseProduction(resource.toString(), userRequirement.level - 1)
      } else {
        quantity += ((new Date().valueOf() - userResource.updatedAt) / 3600000) *
          this.getBaseProduction(resource.toString(), userRequirement.level)
      }
    }
    return quantity
  }

  private calculUserSpecialResource(userResource: UserResource,
                                    userRequirement: UserRequirement): number {

    let quantity: number = userResource.quantity
    const resource: Resources = this.getResourceFromBuildingId(userRequirement.requirementId)

    if (userRequirement.updatedAt > new Date().valueOf()) {
      quantity = this.getBaseProduction(resource.toString(), userRequirement.level - 1)
    } else {
      quantity = this.getBaseProduction(resource.toString(), userRequirement.level)
    }
    return quantity
  }


  private async getStockageMaxResources(user: User, userResource: UserResource) {
    const stockageBuilding = this.getStockageBuildingId(userResource.resource) 
    const userRequirement = <UserRequirement> await user.$get(
      'requirement',
      {
        where: {
          id: stockageBuilding,
        },
      },
    )

    const level = userRequirement ? userRequirement.level : 0

    return Math.round(2.5 * Math.exp(20 * level / 33)) * 5000
  }
}
