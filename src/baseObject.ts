import { Resources } from './resource'

export interface BaseDefinition {
  baseCost: Map<Resources, number>
  duration: number
  name: string
  description: string
}

export class Base {
  baseCost: Map<Resources, number>
  duration: number
  name: string
  description: string
	
  constructor(definition: BaseDefinition) {
    this.baseCost = definition.baseCost
    this.duration = definition.duration
    this.name = definition.name
    this.description = definition.description
  }
}
