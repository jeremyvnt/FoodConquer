import { Resource } from './Resource'
import { UserResource } from './UserResource'
import { Requirement } from './Requirement'
import { UserRequirement } from './UserRequirement'
import {
  Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
  BelongsToMany, HasMany,
} from 'sequelize-typescript'

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  id: number

  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.STRING(100),
  })
  pseudo: string

  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.STRING(100),
  })
  email: string

  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.STRING(100),
  })
  password: string

  @HasMany(() => UserResource)
  resources: UserResource[]

  @HasMany(() => UserRequirement)
  requirements: UserRequirement[]
}
