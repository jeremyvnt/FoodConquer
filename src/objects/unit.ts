import { Base } from './baseObject'
import { Resources } from './resource'
import { Stats } from './statistic'

export interface UnitDefinition {
  baseCost: Map<Resources, number>
  stats: Map<Stats, number>
  name: string
  description: string
  duration: number
}

export class Unit extends Base {
  stats: Map<Stats, number>

  constructor(definition: UnitDefinition) {
    super(definition)
    this.stats = definition.stats
  }
}
