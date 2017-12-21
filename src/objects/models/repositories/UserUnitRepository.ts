import { Sequelize } from 'sequelize-typescript'
import { 
  User,
  UserUnit,
  Unit,
  UnitResource,
} from '../../../models'

export class UserUnitRepository {

  public async findOneUserUnit(user: User, unitId: string) {
    const ur = <UserUnit[]> await user.$get(
      'units',
      {
        where: {
          unitId,
        },
        include: [{
          model: Unit,
        }],
      },
    )
    return ur.length ? ur[0] : null
  }  


  public async findProgressUnits(user: User) {
    return <UserUnit[]> await user.$get(
      'units',
      {
        where: {
          updatedAt: {
            [Sequelize.Op.gte]: new Date().valueOf(),
          }
        },
        include: [{
          model: Unit,
          include: [{
            model: UnitResource,
          }],
        }],
      },
    )
  }
}
