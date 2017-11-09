import { Resources } from './resource'
import { TechTree } from './techTree'

export interface BaseDefinition {
  id: string
  baseCost: Map<Resources, number>
  duration: number
  name: string
  description: string
}

export class Base {
  id: string
  name: string
  description: string
  duration: number
  baseCost: Map<Resources, number>
  technologies: Map<string, number>
	
  constructor(definition: BaseDefinition) {
    this.id = definition.id
    this.name = definition.name
    this.description = definition.description
    this.duration = definition.duration
    this.baseCost = definition.baseCost
    this.technologies = TechTree.TECH_TREE.get(this.id)
  }

}
