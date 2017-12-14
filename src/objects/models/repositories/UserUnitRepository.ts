import { 
  User,
  UserUnit,
  Unit,
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
}
