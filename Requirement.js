require('BaseObject')

class Requirement extends Base {

	constructor(cost, duration, requirements, levelMax, type) {
		super(cost, duration, requirements)
		this.level = 0
		this.levelMax = levelMax
		this.type = type
	}
}