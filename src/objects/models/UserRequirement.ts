import { Requirement } from './Requirement'
import { User } from './User'
import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, AutoIncrement,
} from 'sequelize-typescript'


@Table
export class UserRequirement extends Model<UserRequirement> {    
  @PrimaryKey
  @ForeignKey(() => Requirement)
  @Column
  requirementId: string

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  userId: number

  @Column
  level: number

  @Column({
    type: DataType.BIGINT,
  })
  updatedAt: number
}
