import { Requirement } from './Requirement'
import { User } from './User'
import {
  Table,
  Column, 
  Model, 
  CreatedAt, 
  UpdatedAt, 
  DataType, 
  PrimaryKey, 
  ForeignKey, 
  AutoIncrement, 
  BelongsTo,
} from 'sequelize-typescript'


@Table
export class UserRequirement extends Model<UserRequirement> {    
  @PrimaryKey
  @ForeignKey(() => Requirement)
  @Column({ type: DataType.STRING })
  requirementId: string

  @BelongsTo(() => Requirement)
  requirement: Requirement

  @PrimaryKey
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  userId: number

  @BelongsTo(() => User)
  user: User

  @Column
  level: number

  @Column({
    type: DataType.BIGINT,
  })
  updatedAt: number
}
