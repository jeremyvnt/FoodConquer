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
      [Resources.CEREAL]: this.calculProductionSpeed(
        Resources.CEREAL, 
        userRequirements.find((value) => {
          return value.requirementId === 'Champs'
        }).level),
      [Resources.MEAT]: this.calculProductionSpeed(
        Resources.MEAT, 
        userRequirements.find((value) => {
          return value.requirementId === 'Betail'
        }).level),
      [Resources.WATER]: this.calculProductionSpeed(
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
        return this.calculProductionSpeed(resource, userRequirement.level)
      }).catch((response) => {
        return 0
      })
    })
  }



  private getProductionBuildingId(resource: Resources):string {
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
    }
    return resources
  }

  private getResourceFromString(resourceName: string): Resources {
    let resource: Resources
    switch (resourceName) {
      case Resources.MEAT.toString():
        resource = Resources.MEAT
        break
      case Resources.WATER.toString():
        resource = Resources.WATER
        break
      case Resources.CEREAL.toString():
        resource = Resources.CEREAL
        break
      default:
        resource = null
        break
    }
    return resource
  }


  private calculProductionSpeed(resource: Resources, 
                                buildingLevel: number): number {

    let speed: number

    switch (resource) {
      case Resources.CEREAL:
        speed = 30 * buildingLevel * 1.1 ** buildingLevel
        break
      case Resources.MEAT:
        speed = 20 * buildingLevel * 1.1 ** buildingLevel
        break
      case Resources.WATER:
        speed = 10 * buildingLevel * 1.1 ** buildingLevel
        break
    }
    return speed / 1000 / 60 
  }



  public async getUserResources(user: User) {
    const userRequirements = await UserRequirement.findAll<UserRequirement>({
      where: {
        userId: user.id,
        requirementId: ['Champs', 'Betail', 'Puit'],
      },
    })

    const userResources = await UserResource.findAll<UserResource>({
      where: {
        userId: user.id,
      },
    })


    const resources: any = {
      [Resources.CEREAL]: 0,
      [Resources.MEAT]: 0,
      [Resources.WATER]: 0,
    }
    userRequirements.forEach((userRequirement) => {
      const userResource = userResources.find((value) => {
        return value.resource === this.getResourceFromBuildingId(
          userRequirement.requirementId,
        ).toString()
      })
      resources[userResource.resource] = this.calculUserResource(
        userResource, 
        userRequirement,
      )
    })

    return resources
  }


  private calculUserResource(userResource: UserResource, 
                             userRequirement: UserRequirement): number {

    const resource: Resources = this.getResourceFromBuildingId(userRequirement.requirementId)
    let quantity: number

    if (userRequirement.updatedAt > new Date().valueOf()) {
      quantity = (new Date().valueOf() - userResource.updatedAt) * 
        this.calculProductionSpeed(resource, userRequirement.level - 1)
    } else {
      if (userResource.updatedAt < userRequirement.updatedAt) {
        quantity = (new Date().valueOf() - userRequirement.updatedAt) * 
            this.calculProductionSpeed(resource, userRequirement.level)
          + (userRequirement.updatedAt - userResource.updatedAt) * 
            this.calculProductionSpeed(resource, userRequirement.level - 1)
      } else {
        quantity = (new Date().valueOf() - userResource.updatedAt) * 
            this.calculProductionSpeed(resource, userRequirement.level)
      }
      
    }
    return Math.round(quantity + userResource.quantity)
  }
}
