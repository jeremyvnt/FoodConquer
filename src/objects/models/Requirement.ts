import {
  Table,Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript'

import { Base } from './Base'

@Table
export class Requirement extends Base<Requirement> {

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
    },
    type: DataType.DECIMAL,
  })
  costFactor: number

  @Column({
    validate: {
      notEmpty: true,
    },
    type: DataType.DECIMAL,
  })
	levelMax: number
	
}
