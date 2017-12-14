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
    const ur = <UserRequirement[]> await user.$get(
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
}
