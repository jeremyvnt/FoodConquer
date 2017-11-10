import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript'

import { Base, BaseDefinition } from '../Base'
import { Resources } from '../resource'
import { TechTree } from '../techTree'


export interface RequirementDefinition extends BaseDefinition  {
  type: string
  level: number
  levelMax: number
  costFactor: number
}

@Table({
  timestamps: false,
})
export class Requirement extends Model<Requirement> {

  @PrimaryKey
  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.STRING,
  })
  id:string
  name: string
  type: string
  description: string

  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.INTEGER,
  })
  baseDuration: number
  baseCost: Map<Resources, number>
  technologies: Map<string, number>
  level: number
  levelMax: number
  costFactor: number

  constructor(definition: RequirementDefinition) {
    super()
    this.id = definition.id
    this.name = definition.name
    this.description = definition.description
    this.baseDuration = definition.baseDuration
    this.baseCost = definition.baseCost
    this.technologies = TechTree.TECH_TREE.get(this.id)
    this.type = definition.type
    this.level = definition.level
    this.levelMax = definition.levelMax
    this.levelMax = definition.levelMax
    this.costFactor = definition.costFactor
  }
	
}
