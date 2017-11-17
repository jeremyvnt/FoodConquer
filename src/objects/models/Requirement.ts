import {
  Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript'

import { Base, BaseDefinition } from '../base'
import { Resources } from '../resource'
import { TechTree } from '../techTree'


export interface RequirementDefinition extends BaseDefinition {
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
  id: string
  name: string

  @PrimaryKey
  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.STRING,
  })
  type: string

  description: string

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.INTEGER,
  })
  baseDuration: number

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.INTEGER,
  })
  money: number

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.INTEGER,
  })
  meatBaseCost: number

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.INTEGER,
  })
  waterBaseCost: number

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.INTEGER,
  })
  cerealBaseCost: number

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.INTEGER,
  })
  costFactor: number

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.INTEGER,
  })
  level: number

  baseCost: Map<Resources, number>
  technologies: Map<string, number>
  levelMax: number

  constructor(definition: RequirementDefinition) {
    super()
    this.id = definition.id
    this.name = definition.name
    this.description = definition.description
    this.baseDuration = definition.baseDuration
    this.baseCost = definition.baseCost
    this.technologies = TechTree.TECH_TREE.get(this.id)
    this.type = definition.type
    this.levelMax = definition.levelMax
    this.costFactor = definition.costFactor
  }

}
