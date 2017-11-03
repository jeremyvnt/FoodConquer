import Resource from './resource'

export default class Base {
  baseCost : Map<string, number>
  duration: number
	
  constructor(bastCost: Map<string, number>, duration: number) {
    this.baseCost = bastCost
    this.duration = duration
  }
}
