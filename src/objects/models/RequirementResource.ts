import { Resource, User, Requirement } from '../../models'
import { Resources } from './../resource'
import {
  Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, AutoIncrement, BelongsTo,
} from 'sequelize-typescript'

@Table
export class RequirementResource extends Model<RequirementResource> {
  @PrimaryKey
  @ForeignKey(() => Requirement)
  @Column
  requirementId: string

  @PrimaryKey
  @Column({
    type: DataType.ENUM([
      Resources.CEREAL.toString(),
      Resources.MEAT.toString(),
      Resources.MONEY.toString(),
      Resources.WATER.toString(),
    ]),
  })
  resource: string

  @Column({
    type: DataType.BIGINT,
  })
  cost: number

  @BelongsTo(() => Requirement)
  requirement: Requirement
}
