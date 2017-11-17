import { Requirement } from '../../../objects/models/Requirement'
import { Resources } from '../../../objects/Resource'
import { Resource } from '../../../objects/models/Resource'
import { User } from '../../../objects/models/User'
import { UserRequirement } from '../../../objects/models/UserRequirement'
import { UserResource } from '../../../objects/models/UserResource'


export class ResourcesService {

  public async getGlobalProductionSpeed(user: User):Promise<object> {
    const userRequirements = await UserRequirement.findAll<UserRequirement>({
      where: {
        userId: user.id,
        requirementId: ['Champs', 'Betail', 'Puit'],
      },
    })

    return {
      [Resources.CEREAL]: this.getBaseProduction(
        Resources.CEREAL, 
        userRequirements.find((value) => {
          return value.requirementId === 'Champs'
        }).level),
      [Resources.MEAT]: this.getBaseProduction(
        Resources.MEAT, 
        userRequirements.find((value) => {
          return value.requirementId === 'Betail'
        }).level),
      [Resources.WATER]: this.getBaseProduction(
        Resources.CEREAL, 
        userRequirements.find((value) => {
          return value.requirementId === 'Puit'
        }).level),
    }
  }


  public getProductionSpeed(user: User, resource: Resources):Promise<number> {
    return new Promise(() => {
      UserRequirement.findOne<UserRequirement>({
        where: { 
          userId: user.id, 
          requirementId: this.getProductionBuildingId(resource),
        },
      }).then((userRequirement) => {
        return this.getBaseProduction(resource, userRequirement.level)
      }).catch((response) => {
        return 0
      })
    })
  }



  private getProductionBuildingId(resource: string):string {
    let buildingId: string
    switch (resource) {
      case Resources.CEREAL:
        buildingId = 'Champs'
        break
      case Resources.MEAT:
        buildingId = 'Betail'
        break
      case Resources.WATER:
        buildingId = 'Puit'
        break
      case Resources.MONEY:
        buildingId = 'Mine'
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
      case Resources.CEREAL:
        production = 30 * buildingLevel * 1.1 ** buildingLevel
        break
      case Resources.MEAT:
      case Resources.MONEY:
        production = 20 * buildingLevel * 1.1 ** buildingLevel
        break
      case Resources.WATER:
        production = 10 * buildingLevel * 1.1 ** buildingLevel
        break
      default:
        production = 0
    }
    return Math.round(production)
  }



  public async getUserResources(user: User) {
    const userRequirements = await UserRequirement.findAll<UserRequirement>({
      where: {
        userId: user.id,
        requirementId: ['Champs', 'Betail', 'Puit', 'Mine'],
      },
    })

    const userResources = await UserResource.findAll<UserResource>({
      where: {
        userId: user.id,
      },
    })
    
    const resources: any[] = []
    let moneyUptake = 0

    userRequirements.forEach((userRequirement) =>  {
      moneyUptake += this.getMoneyUptake(userRequirement)
    })

    userResources.forEach((userResource) => {   
      

      const userRequirement: UserRequirement = userRequirements.find((value) => {
        return value.requirementId === this.getProductionBuildingId(
          userResource.resource,
        )
      })

      if (userRequirement) {
        let quantity = this.calculUserResource(userResource, userRequirement)
        const production = this.getBaseProduction(userResource.resource, userRequirement.level)
        
        if (userResource.resource === Resources.MONEY) {
          quantity -= moneyUptake
        }
        
        const resource = {
          quantity,
          production,
          name: userResource.resource,
        }

        resources.push(resource)
      }
    })

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

  private calculUserResource(userResource: UserResource, 
                             userRequirement: UserRequirement): number {

    let quantity: number
    if (userResource.resource !== Resources.MONEY) {
      quantity = this.calculUserBaseResource(userResource, userRequirement)
    } else {
      quantity = this.calculUserSpecialResource(userResource, userRequirement)
    }
    return Math.round(quantity)
  }

  private calculUserBaseResource(userResource: UserResource, 
                                 userRequirement: UserRequirement): number {

    const resource: Resources = this.getResourceFromBuildingId(userRequirement.requirementId)
    let quantity: number = userResource.quantity

    if (userRequirement.updatedAt > new Date().valueOf()) {
      quantity += ((new Date().valueOf() - userResource.updatedAt) / 3600000) * 
        this.getBaseProduction(resource, userRequirement.level - 1)
    } else {
      if (userResource.updatedAt < userRequirement.updatedAt) {
        quantity += ((new Date().valueOf() - userRequirement.updatedAt) / 3600000) * 
            this.getBaseProduction(resource, userRequirement.level)
          + ((userRequirement.updatedAt - userResource.updatedAt) / 3600000) * 
            this.getBaseProduction(resource, userRequirement.level - 1)
      } else {
        quantity += ((new Date().valueOf() - userResource.updatedAt) / 3600000) * 
            this.getBaseProduction(resource, userRequirement.level)
      }
    }
    return quantity
  }

  private calculUserSpecialResource(userResource: UserResource, 
                                    userRequirement: UserRequirement): number {

    let quantity: number = userResource.quantity
    const resource: Resources = this.getResourceFromBuildingId(userRequirement.requirementId)

    if (userRequirement.updatedAt > new Date().valueOf()) {
      quantity = this.getBaseProduction(resource, userRequirement.level - 1)        
    } else {
      quantity = this.getBaseProduction(resource, userRequirement.level)
    }
    return quantity
  }

}
