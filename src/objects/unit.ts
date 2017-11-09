import { Base, BaseDefinition } from './baseObject'
import { Resources } from './resource'
import { Stats } from './statistic'

export interface UnitDefinition extends BaseDefinition {
  stats: Map<Stats, number>
}

export class Unit extends Base {
  stats: Map<Stats, number>

  constructor(definition: UnitDefinition) {
    super(definition)
    this.stats = definition.stats
  }
}
