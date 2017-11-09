import { Resource } from './Resource'
import { User } from './User'
import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, AutoIncrement,
} from 'sequelize-typescript'


@Table
export class UserResource extends Model<UserResource> {    
  @PrimaryKey
  @ForeignKey(() => Resource)
  @Column
  resource: string

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  userId: number

  @Column
  quantity: number

  @Column
  updateAt: Date
}
