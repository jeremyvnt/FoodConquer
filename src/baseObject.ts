import Resource from './resource'

export default class Base {
  baseCost : Map<Resource, number>
  duration: number
	
  constructor(bastCost: Map<Resource, number>, duration: number) {
    this.baseCost = bastCost
    this.duration = duration
  }
}
