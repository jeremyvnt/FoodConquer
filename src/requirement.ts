import Base from './baseObject'
import Resource from './resource'

export default class Requirement extends Base {
  baseCost: Map<Resource.RESOURCES, number>
  duration: number
  level: number
  levelMax: number
  costFactor: number

  constructor(baseCost: Map<Resource.RESOURCES,number>,duration: number,
              levelMax: number, costFactor: number) {
    super(baseCost, duration)
    this.level = 0
    this.levelMax = levelMax
    this.costFactor = costFactor
    this.baseCost = new Map()
  }

  getCost(): Map<string, number> {
    const cost: Map<string, number> = new Map()
    for(let resource:Resource.RESOURCES in Resource.RESOURCES) {
      const b = this.baseCost.get(resource) | 0
      cost.set(resource, Math.floor(b * (this.costFactor ** (this.level - 1))))
    })
    return cost
  }
}
