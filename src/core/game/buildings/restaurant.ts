import { Requirement } from '../../../Requirement'
import { Resources } from '../../../resource'

const id = 'Restaurant'
const name = 'Restaurant'
const description = 'Un fastfood'

export class Restaurant extends Requirement {

  constructor(level: number) {
    super({
      id,
      level,
      name,
      description,
      baseCost: new Map([
        [Resources.MONEY, 500], 
        [Resources.MEAT, 300],
        [Resources.WATER, 200],
      ]),
      duration: 3000,
      levelMax: 30,
      costFactor: 2,
    })
  }
}
