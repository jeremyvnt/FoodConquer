import { Requirement } from '../../../objects/models/Requirement'
import { Resources } from '../../../objects/resource'
import { User } from '../../../objects/models/User'
import { UserRequirement } from '../../../objects/models/UserRequirement'
import { UserResource } from '../../../objects/models/UserResource'

export abstract class ResourcesService {

  static getGlobalProductionSpeed = (user: User):Promise<object> => {
    return new Promise((resolve) =>  {
      resolve(
        UserRequirement.findAll<UserRequirement>({
          where: {
            userId: user.id,
            requirementId: ['Champs', 'Betail', 'Puit'],
          },
        }).then((userRequirements) => {
          return {
            [Resources.CEREAL]: ResourcesService.calculProductionSpeed(
              Resources.CEREAL, 
              userRequirements.find((value: UserRequirement) => {
                return value.requirementId === 'Champs'
              }).level),
            [Resources.MEAT]: ResourcesService.calculProductionSpeed(
              Resources.MEAT, 
              userRequirements.find((value: UserRequirement) => {
                return value.requirementId === 'Betail'
              }).level),
            [Resources.WATER]: ResourcesService.calculProductionSpeed(
              Resources.CEREAL, 
              userRequirements.find((value: UserRequirement) => {
                return value.requirementId === 'Puit'
              }).level),
          }
        }).catch((response) => {
          return 0
        }),
      )
    })
  }


  static getSpeedResource = (user: User, resources: Resources):Promise<number> => {
    return new Promise((resolve) => {
      resolve(
        UserRequirement.findOne<UserRequirement>({
          where: { 
            userId: user.id, 
            requirementId: ResourcesService.getProductionBuildingId(resources),
          },
        }).then((userRequirement) => {
          return ResourcesService.calculProductionSpeed(resources, userRequirement.level)
        }).catch((response) => {
          return 0
        }),
      )
    })
  }



  static getProductionBuildingId = (resources: Resources):string => {
    let buildingId: string
    switch (resources) {
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


  static calculProductionSpeed = (resources: Resources, levelBuilding: number):number =>  {
    let speed: number
    switch (resources) {
      case Resources.CEREAL:
        speed = 30 * levelBuilding * 1.1 ** levelBuilding
        break
      case Resources.MEAT:
        speed = 20 * levelBuilding * 1.1 ** levelBuilding
        break
      case Resources.WATER:
        speed = 10 * levelBuilding * 1.1 ** levelBuilding
        break
    }
    return speed 
  }
}
