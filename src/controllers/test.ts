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
    { verb: 'post', path: '/', action: 'create' },
  ]

  /**
   * Action qui liste nos Todos
   * 
   * @param {NextFunction} next 
   * @memberof TestController
   */
  public index(next: NextFunction) {
    /*const unit = new Unit({
      baseCost: new Map([[Resources.CEREAL, 10], [Resources.MEAT, 20]]),
      stats: new Map([[Stats.ARMOR, 5], [Stats.HEALTH, 50], [Stats.STRENGTH, 10]]),
      name: 'Chinois',
      id: 'Chinois',
      description: 'Un jaune',
      baseDuration: 1500,
    })*/
    /*
        const resourceService = new ResourcesService()
    
        User.findOne<User>({ where: { pseudo: 'Jerem' } }).then((user) => {
          if (!user) {
            const user = new User({
              pseudo: 'Jerem',
              email: 'jerem@g.C',
              password: 'aaa',
            })
            user.save()
          }
          resourceService.getGlobalProductionSpeed(user).then((globalSpeed) => {
            this.res.json(globalSpeed)
          })
          Requirement.findOne<Requirement>({ where: { id:'Champs' } }).then((champs) => {
            if (!champs) {
              const champs = new Requirement({
                id: 'Champs',
                name: 'Champs',
                description: 'Un champs de céréales',
                level: 0,
                type: 'BUILDING',
                baseCost: new Map([
                  [Resources.MONEY, 500], 
                  [Resources.MEAT, 300],
                  [Resources.WATER, 200],
                ]),
                baseDuration: 10000,
                levelMax: 30,
                costFactor: 2,
              })
              champs.save().then(() => {
                const userRequirement = new UserRequirement({ 
                  userId: 1,
                  requirementId: champs.id,
                  level: champs.level,
                  updatedAt: new Date().valueOf() + champs.baseDuration,
                })
    
                userRequirement.save().then((ur) => {
                  this.res.json(ur)
                  UtilService.requirementLater(champs.baseDuration, ur)
                })          
              })
            }else {
              UserRequirement.findOne<UserRequirement>({ 
                where: { userId: 1, requirementId: champs.id },
              }).then((ur) => {
                ResourcesService.getSpeedResource(user, Resources.CEREAL).then((speed) => {
                  this.res.json(speed)
                }).catch((response) => {
                  this.res.json(response)              
                })
                ur.update({ updatedAt: new Date().valueOf() + champs.baseDuration })
                UtilService.requirementLater(champs.baseDuration, ur)
              })
            }
          })
  })*/
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


  /**
   * Action qui créé une Todo
   * 
   * @param {NextFunction} next 
   * @memberof TestController
   */
  public create(next: NextFunction) {
    console.log(this.req.body)
    const todo = new Todo(this.req.body)

    todo.save().then(() => {
      this.res.json(todo)
    }).catch(next) // On oublie pas le catch !!!!!
  }
}
