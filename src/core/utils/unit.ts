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
import { maxStokage, baseProduction, moneyUptake, upgradeCost } from './formula'
import { RequirementService } from './requirements'



export class UnitService {

  public async getUnits(user: User) {
    const requirementService = new RequirementService()
    const units = <UserUnit[]> await user.$get(
      'units',
      {
        includes: [{
          model: Unit,
        }],
      },
    )

    const customUnits = await Promise.all(units.map(async (userUnit) => {

      let unit = <Unit> await userUnit.$get('unit')
      const resources = <UnitResource[]> await unit.$get('resources')
      const buildCost = this.constructCostObject(resources)
      const buildingTime = await requirementService.getBuildingTime(
        user, 
        buildCost.cereal, 
        buildCost.meat,
      )
      
      let remainingTime = 0
      let totalBuilt = userUnit.quantity

      if (userUnit.updatedAt > new Date().valueOf()) {
        remainingTime = (userUnit.updatedAt - new Date().valueOf()) / 3600000
        totalBuilt = Math.floor((userUnit.quantity * buildingTime - remainingTime) / buildingTime)
        if (totalBuilt < 0)
          totalBuilt = 0
      }
      
      unit = JSON.parse(JSON.stringify(unit))
      return { 
        ...unit,
        remainingTime,
        buildingTime,
        quantity: totalBuilt,
        remainingToBuild: userUnit.quantity - totalBuilt,
        cost: buildCost,
      }
    }))
    
    return customUnits
  }


  public constructCostObject(unitResources: UnitResource[]) {
    const cost: {[index:string]: number} = {}
    unitResources.map((unitResource) => {
      cost[unitResource.resource] = unitResource.cost
    })
    return cost
  }

}
