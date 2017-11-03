import Base from './baseObject'
import Resource from './resource'
import Statistic from './statistic'


export default class Unit extends Base {
  stats: Map<Statistic.STATS, number>

  constructor(baseCost: Map<string, number>, stats: Map<Statistic.STATS, number>, duration: number) {
  	super(baseCost, duration)	
  	this.stats = stats
  }
}
