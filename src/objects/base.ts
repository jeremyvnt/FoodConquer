import Resource from './resource'

export default abstract class Base {
  baseCost: {[resource: string]: number}
  duration: number
	
  constructor(bastCost: {[resource: string]: number}, duration: number) {
    this.baseCost = bastCost
    this.duration = duration
  }
}
