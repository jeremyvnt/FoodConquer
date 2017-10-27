import Base from './BaseObject'

export default class Unit extends Base {

	constructor(baseCost, stats, duration){
		super(baseCost, duration)	
		this.stats = stats
	}

}