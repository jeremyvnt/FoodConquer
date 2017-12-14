import { Resource, RequirementResource, UserRequirement } from '../../models'
import {
  Table, Column, Model,
  CreatedAt, UpdatedAt, DataType,
  PrimaryKey, AutoIncrement, BelongsToMany,
  HasMany,
} from 'sequelize-typescript'

import { BaseDefinition } from '../base'
import { Resources } from '../resource'
import { TECH_TREE } from '../techTree'


export interface RequirementDefinition extends BaseDefinition {
  type: string
  level: number
  levelMax: number
}

@Table({
  timestamps: false,
})
export class Requirement extends Model<Requirement> {

  @PrimaryKey
  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.STRING,
  })
  id: string

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.STRING,
  })
  name: string

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.STRING,
  })
  type: string

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.TEXT,
  })
  description: string

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.INTEGER,
  })
  levelMax: number

  @HasMany(() => RequirementResource)
  resources: RequirementResource[]

  @HasMany(() => UserRequirement)
  userRequirements: UserRequirement[]
}
