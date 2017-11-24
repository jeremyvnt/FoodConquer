import { Unit } from './Unit'
import { User } from './User'
import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, AutoIncrement,
} from 'sequelize-typescript'


@Table
export class UserUnit extends Model<UserUnit> {    
  @PrimaryKey
  @ForeignKey(() => Unit)
  @Column
  unitId: string

  @PrimaryKey
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  userId: number

  @Column
  quantity: number

  @Column
  level: number

  @Column
  updateAt: number
}
