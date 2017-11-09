import { Resource } from './Resource'
import { UserResource } from './UserResource'
import {
  Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript'

@Table({
  tableName: 'user',
})
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

  @BelongsToMany(() => Resource, () => UserResource)
  resources: Resource[]
}
