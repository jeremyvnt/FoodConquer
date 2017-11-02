import Requirement from '../../../Requirement'

export default class Cook extends Requirement {

  constructor(baseCost: Map<Resource,number>,duration: number,
              levelMax: number, costFactor: number) {
    super(baseCost, duration, levelMax, costFactor)
  }
}
