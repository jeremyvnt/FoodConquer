import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript'

@Table
export class Requirement extends Model<Requirement> {
  @PrimaryKey
  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.ENUM(['NAME1', 'NAME2',
    ]),
  })
  name: string

  @PrimaryKey
  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.ENUM(['BUILDING', 'RESEARCH']),
  })
  type: string

  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.STRING(100),
  })
  description: string

	 @Column({
   validate: {
     notEmpty: true,
   },
   type: DataType.DECIMAL,
 })
	baeDuration: number
	
}
