import { Base, BaseDefinition } from './baseObject'
import { Resources } from './resource'


export interface RequirementDefinition extends BaseDefinition  {
  level: number
  levelMax: number
  costFactor: number
}

export class Requirement extends Base {
  level: number
  levelMax: number
  costFactor: number

  constructor(definition: RequirementDefinition) {
    super(definition)
    this.level = definition.level
    this.levelMax = definition.levelMax
    this.costFactor = definition.costFactor
  }

  getCost(): Map<Resources, number> {
    const cost: Map<Resources, number> = new Map()

    this.baseCost.forEach((value:number, key:Resources) => {
      const quantity = this.baseCost.get(key)
      cost.set(key, Math.floor(quantity * (this.costFactor ** (this.level - 1))))
    })

    return cost
  }
}
