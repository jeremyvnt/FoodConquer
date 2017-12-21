import { Resources } from '../../objects/resource'
import { User,
 Resource,
 Requirement,
 UserRequirement,
 UserResource,
 RequirementResource,
 UnitResource,
 UserUnit,
 Unit,
} from '../../models'
import { Model } from 'sequelize-typescript'
import { buildingTime } from './formula'
import { ResourcesService } from './resources'
import { RequirementService } from './requirements'
import { UserUnitRepository } from '../../objects/models/repositories/UserUnitRepository'
import { TECH_TREE } from '../../objects/techTree'
import { PreconditionFailedError } from '../../errors'


export class UnitService {

  uuRepository: UserUnitRepository

  constructor() {
    this.uuRepository = new UserUnitRepository()
  }



  public async getUnits(user: User) {
    const requirementService = new RequirementService()
    const userUnits = <UserUnit[]> await user.$get(
      'units',
      {
        include: [{
          model: Unit,
        }],
      },
    )

    const units = await Unit.findAll<Unit>(
      {
        include: [{
          model: UnitResource,
        }],
      },
    )

    const customUnits = await Promise.all(units.map(async (unit) => {
      const userUnit = userUnits.find(userUnit => userUnit.unitId === unit.id)
      const buildCost = this.constructCostObject(unit.resources)
      const buildingTime = await requirementService.getBuildingTime(
        user, 
        buildCost.cereal, 
        buildCost.meat,
      )
      const available = await requirementService.hasRequirements(user, unit.id)
      
      let remainingTime = 0
      let totalBuilt = userUnit && userUnit.quantity || 0

      if (userUnit && userUnit.updatedAt > new Date().valueOf()) {
        remainingTime = (userUnit.updatedAt - new Date().valueOf()) / 3600000
        totalBuilt = Math.floor((userUnit.quantity * buildingTime - remainingTime) / buildingTime)
        if (totalBuilt < 0)
          totalBuilt = 0
      }

      const newUnit = JSON.parse(JSON.stringify(unit))
      delete newUnit.resources
      
      return { 
        ...newUnit,
        available,
        remainingTime,
        buildingTime,
        quantity: totalBuilt,
        remainingToBuild: userUnit ? userUnit.quantity - totalBuilt : 0,
        cost: buildCost,
        requirements: TECH_TREE[newUnit.id],
      }
    }))
    
    return customUnits
  }


  public async createUnits(user: User, unit: Unit, quantity: number) {

    const resourcesService = new ResourcesService()
    const requirementService = new RequirementService()

    if (!await requirementService.hasRequirements(user, unit.id))
      throw new PreconditionFailedError('Needs some requirements')

    const userResources = await resourcesService.getUserResources(user)
    const buildCost = this.constructCostObject(<UnitResource[]> await unit.$get('resources'))

    const maxCanBuild = resourcesService.getMaxUnitToBuild(userResources, buildCost)
    const quantityToBuild = maxCanBuild < quantity ? maxCanBuild : quantity

    if (quantityToBuild === 0)
      throw new PreconditionFailedError('Not enougth resources')

    await resourcesService.withdrawResources(user, userResources, buildCost, quantityToBuild)
  
    const buildingTime = await requirementService.getBuildingTime(
      user, 
      buildCost.cereal, 
      buildCost.meat,
    ) * quantityToBuild

    let userUnit = await this.uuRepository.findOneUserUnit(user, unit.id)
    
    if (!userUnit) {
      userUnit = new UserUnit()
      userUnit.set('quantity', quantityToBuild)
      userUnit.set('updatedAt', new Date().valueOf() + buildingTime * 3600000)
      userUnit.set('userId', user.id)
      userUnit.set('unitId', unit.id)
    } else {
      userUnit.set('quantity', userUnit.quantity + quantityToBuild)
      if (userUnit.updatedAt > new Date().valueOf())
        userUnit.set('updatedAt', userUnit.updatedAt + buildingTime * 3600000)
      else
        userUnit.set('updatedAt', new Date().valueOf() + buildingTime * 3600000)
    }
    userUnit.save()
  }


  private constructCostObject(unitResources: UnitResource[]) {
    const cost: {[index:string]: number} = {}
    unitResources.map((unitResource) => {
      cost[unitResource.resource] = unitResource.cost
    })
    return cost
  }
}
