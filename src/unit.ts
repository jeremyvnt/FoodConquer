import Base from './baseObject'
import Resource from './resource'
import Statistic from './statistic'


export default class Unit extends Base {
  stats: Map<Statistic, number>

  constructor(baseCost: Map<Resource, number>, stats: Map<Statistic, number>, duration: number) {
	  super(baseCost, duration)	
    this.stats = stats
  }
}
