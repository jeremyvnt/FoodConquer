import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript'

@Table({
  tableName: 'todos',
})
export class Todo extends Model<Todo> {
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
  message: string

  @Column
  completedAt: Date
}
