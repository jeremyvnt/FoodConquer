require('BaseObject')

class Unit extends BaseObject {

	constructor(cost, duration, requirements, stats){
		super(cost, duration, requirements)	
		this.stats = stats
	}

}