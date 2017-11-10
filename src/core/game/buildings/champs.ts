import { Requirement } from './../../../objects/models/requirement'
import { Resources } from '../../../objects/resource'

const id = 'Champs'
const name = 'Champs'
const description = 'Un champs de céréales'

export class Champs extends Requirement {

  constructor(level: number) {
    super({
      id,
      name,
      description,
      level,
      type: 'BUILDING',
      baseCost: new Map([
        [Resources.MONEY, 500], 
        [Resources.MEAT, 300],
        [Resources.WATER, 200],
      ]),
      baseDuration: 5000,
      levelMax: 30,
      costFactor: 2,
    })
  }
}
