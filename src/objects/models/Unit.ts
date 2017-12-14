import { Resources } from './../resource'
import { UnitResource } from './UnitResource'
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript'

@Table
export class Unit extends Model<Unit> {
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
    type: DataType.TEXT,
  })
  description: string

  @Column({
    validate: {
      notEmpty: true,
    },
  })
  armor: number

  @Column({
    validate: {
      notEmpty: true,
    },
  })
  strength: number

  @Column({
    validate: {
      notEmpty: true,
    },
  })
  health: number

  @Column({
    validate: {
      notEmpty: true,
    },
  })
  speed: number

  @Column({
    validate: {
      notEmpty: true,
    },
  })
  storage: number

  @Column({
    validate: {
      notEmpty: true,
    },
  })
  uptake: number

  @Column({
    validate: {
      notEmpty: true,
    },
  })
  type: string

  @HasMany(() => UnitResource)
  resources: UnitResource[]

}
