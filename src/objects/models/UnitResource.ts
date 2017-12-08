import { Resource, User, Unit } from '../../models'
import {
  Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, AutoIncrement, BelongsTo,
} from 'sequelize-typescript'

@Table
export class UnitResource extends Model<UnitResource> {
  @PrimaryKey
  @ForeignKey(() => Unit)
  @Column
  unitId: string

  @PrimaryKey
  @ForeignKey(() => Resource)
  @Column
  resourceId: string

  @Column({
    type: DataType.BIGINT,
  })
  cost: number

  @BelongsTo(() => Unit)
  unit: Unit
}
