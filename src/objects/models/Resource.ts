import { Resources } from './../resource'
import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript'

@Table({
  tableName: 'resource',
})
export class Resource extends Model<Resource> {

  @PrimaryKey
  @Column({
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
    type: DataType.ENUM([
      Resources.CEREAL.toString(),
      Resources.MEAT.toString(),
      Resources.MONEY.toString(),
      Resources.WATER.toString(),
    ]),
  })
  name: string
}
