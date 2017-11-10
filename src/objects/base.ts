import {
  Table ,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript'

import { Resources } from './resource'
import { TechTree } from './techTree'

export interface BaseDefinition {
  id: string
  baseCost: Map<Resources, number>
  baseDuration: number
  name: string
  description: string
}

export class Base<T> {
  
  id:string
  name: string
  type: string
  description: string
  baseDuration: number
  baseCost: Map<Resources, number>
  technologies: Map<string, number>

  constructor(definition: BaseDefinition) {
    this.id = definition.id
    this.name = definition.name
    this.description = definition.description
    this.baseDuration = definition.baseDuration
    this.baseCost = definition.baseCost
    this.technologies = TechTree.TECH_TREE.get(this.id)
  }
	
}
