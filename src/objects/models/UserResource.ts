import { Resource } from './Resource'
import { User } from './User'
import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, AutoIncrement,
} from 'sequelize-typescript'


@Table
export class UserResource extends Model<UserResource> { 
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  userId: number
   
  @PrimaryKey
  @ForeignKey(() => Resource)
  @Column
  resourceId: number

  @Column
  quantity: number

  @Column
  updateAt: Date
}
