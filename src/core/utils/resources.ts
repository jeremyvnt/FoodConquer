import { Resources } from '../../objects/resource'
import { User, Resource, Requirement, UserRequirement, UserResource, RequirementResource } from '../../models'
import { UserRequirementRepository } from '../../objects/models/repositories/UserRequirementRepository'
import { Model } from 'sequelize-typescript'
import { maxStokage, baseProduction, moneyUptake, upgradeCost } from './formula'



export class ResourcesService {

  urRepository: UserRequirementRepository

  constructor() {
    this.urRepository = new UserRequirementRepository()
  }

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
    const userRequirements = await this.urRepository.findUserRequirements(
      user, 
      ['champs', 'betail', 'puits', 'mine'],
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
      let userRequirementLevel = 0

      if (userRequirement && userRequirement.updatedAt > new Date().valueOf())
        userRequirementLevel = userRequirement.level - 1
      else if (userRequirement && userRequirement.updatedAt <= new Date().valueOf())
        userRequirementLevel = userRequirement.level

      quantity = await this.calculUserResource(user, userResource, userRequirement)


      production = baseProduction(userResource.resource, userRequirementLevel)

      if (userResource.resource === Resources.MONEY.toString())
        quantity -= totalMoneyUptake
      
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

  private async calculUserResource(user: User,
                             userResource: UserResource,
                             userRequirement?: UserRequirement) {

    let quantity: number
    if (userResource.resource !== Resources.MONEY.toString()) {
      quantity = await this.calculUserBaseResource(user, userResource, userRequirement)
    } else {
      quantity = this.calculUserSpecialResource(userResource, userRequirement)
    }

    return Math.round(quantity)
  }

  private async calculUserBaseResource(user: User,
                                 userResource: UserResource,
                                 userRequirement?: UserRequirement) {

    const resource = userResource.resource
    let quantity = userResource.quantity
    const max = await this.getStockageMaxResources(user, userResource)
    let production = 0
    let finalQuantity = 0

    if (userRequirement && userRequirement.updatedAt > new Date().valueOf()) {
      production = ((new Date().valueOf() - userResource.updatedAt) / 3600000) *
        baseProduction(resource, userRequirement.level - 1)
    } else {
      if (userRequirement && userResource.updatedAt < userRequirement.updatedAt) {
        production = ((new Date().valueOf() - userRequirement.updatedAt) / 3600000) *
          baseProduction(resource, userRequirement.level)
          + ((userRequirement.updatedAt - userResource.updatedAt) / 3600000) *
          baseProduction(resource, userRequirement.level - 1)
      } else {
        production = ((new Date().valueOf() - userResource.updatedAt) / 3600000) *
          baseProduction(resource, userRequirement ? userRequirement.level : 0)
      }
    }

    if (quantity + production < max)
      finalQuantity = quantity + production
    else if (quantity > max)
      finalQuantity = quantity
    else if (quantity < max && quantity + production > max)
      finalQuantity = max

    return finalQuantity
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
    const level = await this.urRepository.getUserRequirementLevel(user, stockageBuilding)

    return maxStokage(level)
  }



  public hasEnoughResources(userResources: any[], cost: {[index:string]: number}) {
    let canBuy = true

    for (const resource in cost) {
      const tempCost = cost[resource]
      const userResource = userResources.find((userResource) => {
        return userResource.name === resource
      })
      if (userResource.quantity < tempCost)
        canBuy = false
    }
    return canBuy
  }


  public getMaxUnitToBuild(userResources: any[], cost:  {[index:string]: number}) {
    let quantity

    for (const resource in cost) {
      const tempCost = cost[resource]
      const userResource = userResources.find((userResource) => {
        return userResource.name === resource
      })

      if (!quantity || quantity > Math.floor(userResource.quantity / tempCost))
        quantity = Math.floor(userResource.quantity / tempCost)
    }

    return quantity
  }



  public async withdrawResources(user: User, 
                                 userResources: any[], 
                                 cost: {[index:string]: number}, 
                                 multiple: number = 1) {

    for (const resource in cost) {
      const tempCost = cost[resource]
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
      userResource.set('quantity', quantity - tempCost * multiple)
      userResource.set('updatedAt', new Date().valueOf())
      userResource.save()
    }
  }



  public async getUpgradeCost(user: User, requirement: Requirement, level: number) {
    
    const requirementResources = <RequirementResource[]>await requirement.$get('resources')

    const cerealCost = requirementResources.find(rr => rr.resource === Resources.CEREAL)
    const meatCost = requirementResources.find(rr => rr.resource === Resources.MEAT)
    const waterCost = requirementResources.find(rr => rr.resource === Resources.WATER)

    return upgradeCost(
      cerealCost ? cerealCost.cost : 0, 
      meatCost ? meatCost.cost : 0, 
      waterCost ? waterCost.cost : 0, 
      requirement, 
      level,
    )
  }


}
