import Requirement from '../../../Requirement'

export default class Restaurant extends Requirement {
  
  constructor(baseCost: Map<Resource, number> ,
              duration: number, levelMax: number, costFactor: number) {
    super(baseCost, duration, levelMax, costFactor)
  }
}
