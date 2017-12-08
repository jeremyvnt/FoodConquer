import { Champs } from './../core/game/buildings/champs'
import { ResourcesService } from './../core/utils/resources'
import { User } from './../objects/models/User'
import { Requirement } from './../objects/models/Requirement'
import { UserRequirement } from './../objects/models/UserRequirement'
import { Stats } from './../objects/statistic'
import { BaseController, Route, NextFunction } from './'
import { Todo } from '../models'
import { Unit } from '../objects/unit'
import { Resources } from '../objects/resource'

export class TestController extends BaseController {

  static basePath = '/test'

  static routes: Route[] = [
    { path: '/', action: 'resources' },
    { path: '/resources', action: 'resources' },
    { path: '/upgrade-building/:buildingId', action: 'upgradeBuilding' },
  ]

  /**
   * Action qui liste nos Todos
   * 
   * @param {NextFunction} next 
   * @memberof TestController
   */
  public index(next: NextFunction) {
  }


  /**
   * Retourne les ressources actuelles
   * 
   * @param {NextFunction} next 
   * @memberof TestController
   */
  public resources(next: NextFunction) {

    const resourceService = new ResourcesService()

    User.findOne<User>({ where: { pseudo: 'Jerem' } }).then((user) => {
      resourceService.getUserResources(user).then((resources) => {
        this.res.json(resources)
      }).catch((err) => {
        this.res.json(55)
      })
    }).catch((err) => {
      this.res.json(10)
    })
  }

  /**
   * Upgrade un batiment
   * 
   * @param {NextFunction} next 
   * @memberof TestController
   */
  public upgradeBuilding(next: NextFunction) {

  }
}
