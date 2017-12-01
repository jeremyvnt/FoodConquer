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
    case 'Puit':
      moneyUptake = 10 * userRequirement.level * 1.1 ** userRequirement.level
      break
    default:
      moneyUptake = 0
      break
  }
  return Math.round(moneyUptake)
}


export const buildingTime = (cerealCost: number,
                             meatCost: number,
                             level: number,
                             portugaisLevel: number,
                             artisantLevel: number): number => {

  return (cerealCost + meatCost) / (2500 * (4 - level / 2) * (1 + portugaisLevel)) * (2 ** artisantLevel)
}
