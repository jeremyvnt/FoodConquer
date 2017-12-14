import { Resource, User, Unit } from '../../models'
import { Resources } from './../resource'
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

  @BelongsTo(() => Unit)
  unit: Unit
}
