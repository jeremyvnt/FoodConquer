import { Resource } from './Resource'
import { Resources } from './../resource'
import { User } from './User'
import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, AutoIncrement,
} from 'sequelize-typescript'


@Table
export class UserResource extends Model<UserResource> {    
  @PrimaryKey
  @ForeignKey(() => Resource)
  @Column({
    type: DataType.ENUM([
      Resources.CEREAL.toString(),
      Resources.MEAT.toString(),
      Resources.MONEY.toString(),
      Resources.WATER.toString(),
    ]),
  })
  resource: string

  @PrimaryKey
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  userId: number

  @Column
  quantity: number

  @Column({
    type: DataType.BIGINT,
  })
  updatedAt: number
}
