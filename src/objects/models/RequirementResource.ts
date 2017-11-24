import { Resource, User, Requirement } from '../../models'
import {
  Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, AutoIncrement,
} from 'sequelize-typescript'

@Table
export class RequirementResource extends Model<RequirementResource> {
  @PrimaryKey
  @ForeignKey(() => Requirement)
  @Column
  requirementId: string

  @PrimaryKey
  @ForeignKey(() => Resource)
  @Column
  resourceId: string

  @Column({
    type: DataType.BIGINT,
  })
  cost: number
}
