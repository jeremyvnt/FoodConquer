import { Resources } from '../../objects/resource'
import { UserRequirement } from '../../models'

export const maxStokage = (level: number): number => {
  return Math.round(2.5 * Math.exp(20 * level / 33)) * 5000
}


export const baseProduction = (resource: string,
                               level: number): number => {
  let production: number

  switch (resource) {
    case Resources.CEREAL.toString():
      production = 30 + 30 * level * 1.1 ** level
      break
    case Resources.MEAT.toString():
      production = 15 + 20 * level * 1.1 ** level
      break
    case Resources.MONEY.toString():
      production = 20 * level * 1.1 ** level
      break
    case Resources.WATER.toString():
      production = 10 * level * 1.1 ** level
      break
    default:
      production = 0
      break
  }
  return Math.round(production)
}


export const moneyUptake = (userRequirement: UserRequirement): number => {
  let moneyUptake = 0

  switch (userRequirement.requirementId) {
    case 'Champs':
      moneyUptake = 10 * userRequirement.level * 1.1 ** userRequirement.level
      break
    case 'Betail':
      moneyUptake = 10 * userRequirement.level * 1.1 ** userRequirement.level
      break
    case 'Puits':
      moneyUptake = 10 * userRequirement.level * 1.1 ** userRequirement.level
      break
    default:
      moneyUptake = 0
      break
  }
  return Math.round(moneyUptake)
}


export const upgradeCost = (cerealCost: number,
                            meatCost: number,
                            waterCost: number,
                            userRequirement: UserRequirement): any => {

  const cost = {
    [Resources.CEREAL]: 0,
    [Resources.MEAT]: 0,
    [Resources.WATER]: 0,
  }

  switch (userRequirement.id) {
    case 'Champs':
    case 'Mine':
    case 'Puits':
      cost[Resources.CEREAL] = cerealCost * 1.5 ** userRequirement.level
      cost[Resources.MEAT] = meatCost * 1.5 ** userRequirement.level
      cost[Resources.WATER] = waterCost * 1.5 ** userRequirement.level
      break
    case 'Betail':
      cost[Resources.CEREAL] = cerealCost * 1.6 ** userRequirement.level
      cost[Resources.MEAT] = meatCost * 1.6 ** userRequirement.level
      cost[Resources.WATER] = waterCost * 1.6 ** userRequirement.level 
    default:
      cost[Resources.CEREAL] = cerealCost * 2 ** userRequirement.level
      cost[Resources.MEAT] = meatCost * 2 ** userRequirement.level
      cost[Resources.WATER] = waterCost * 2 ** userRequirement.level    
      break
  }
  return cost
}



export const buildingTime = (cerealCost: number,
                             meatCost: number,
                             portugaisLevel: number,
                             artisantLevel: number): number => {

  return (cerealCost + meatCost) / (2500 * (1 + portugaisLevel)) * (2 ** artisantLevel)
}
