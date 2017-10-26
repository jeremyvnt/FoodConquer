import Base from './BaseObject'

export default class Unit extends Base {

	constructor(cost, duration, requirements, stats){
		super(cost, duration, requirements)	
		this.stats = stats
	}

}