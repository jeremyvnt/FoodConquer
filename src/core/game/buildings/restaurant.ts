import { Requirement } from './../../../objects/models/requirement'
import { Resources } from '../../../objects/resource'

const id = 'Restaurant'
const name = 'Restaurant'
const description = 'Un fastfood'

export class Restaurant extends Requirement {

  constructor(level: number) {
    super({
      id,
      name,
      description,
      /*baseCost: new Map([
        [Resources.MONEY, 500], 
        [Resources.MEAT, 300],
        [Resources.WATER, 200],
      ]),*/
      baseDuration: 5000,
      levelMax: 30,
      costFactor: 2,
    })
  }
}
