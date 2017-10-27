import Base from './BaseObject'
import RESOURCES from './resources'

export default class Requirement extends Base {

	constructor(baseCost, duration, levelMax, costFactor) {
		super(baseCost, duration)
		this.level = 0
		this.levelMax = levelMax
		this.costFactor = costFactor
	}

	getCost = () => {
		const { baseCost, level, costFactor: k } = this
		const cost = {}
		RESOURCES.map( resource => {
			const b = baseCost[resource] | 0
			cost[resource] = Math.floor(b * (k ** (level - 1)))
		})
		return cost
	}
}