import {
  Table ,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript'


export class Base<T> extends Model<Base<T>> {
  @PrimaryKey
  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.ENUM(['NAME1', 'NAME2',
    ]),
  })
  id: string

  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.ENUM(['NAME1', 'NAME2',
    ]),
  })
  name: string

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
	baseDuration: number
	
}
