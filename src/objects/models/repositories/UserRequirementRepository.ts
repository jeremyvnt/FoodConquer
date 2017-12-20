import { Sequelize } from 'sequelize-typescript'
import { 
  User,
  Resource,
  Requirement,
  UserRequirement,
  RequirementResource,
  UserResource, 
} from '../../../models'

export class UserRequirementRepository {

  public async findOneUserRequirement(user: User, requirementId: string) {
    const ur = <UserRequirement[]>await user.$get(
      'requirements',
      {
        where: {
          requirementId,
        },
        include: [{
          model: Requirement,
        }],
      },
    )
    return ur.length ? ur[0] : null
  }  

  public async getUserRequirementLevel(user: User, requirementId: string) {
    const ur = await this.findOneUserRequirement(user, requirementId)
    return ur ? ur.level : 0
  }

  public async findUserRequirements(user: User, requirementsId: string[]) {
    return <UserRequirement[]>await user.$get(
      'requirements',
      {
        where: {
          requirementId: requirementsId,
        },
      },
    )
  }


  public async findRequirementInProgress(user: User, type: string) {
    return await UserRequirement.findOne({
      where: {
        updatedAt: {
          [Sequelize.Op.gt]: new Date().valueOf()
        },
      },
      include : [{
        model: Requirement,
        where: {
          type,
        },
      }],
    })
  }
}
