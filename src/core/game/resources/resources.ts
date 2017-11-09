import { Resources } from '../../../objects/Resource'
import { Resource } from '../../../objects/models/Resource'
import { User } from '../../../objects/models/User'
import { UserResource } from '../../../objects/models/UserResource'

export class ResourcesService {

  private getSpeedResource(user: User, resources: Resources):number {

    UserResource.findOne<UserResource>({
      where: { userId: user.id, resource: resources.toString() },
    }).then((userResource) => {
      const quantity = userResource.quantity
      /*
      UserRequirement.findOne<UserRequirement>({
        where: { userId: user.id, requirement: this.getProductionBuilding(resources) }
      }).then(())
      */
    })


    return 5
  }



  private getProductionBuilding(resouces: Resources):Requirement {
    /*
    switch 
      case
    */
    return 
  }
}
