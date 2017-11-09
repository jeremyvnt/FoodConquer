import { Restaurant } from './../core/game/buildings/restaurant'
import { Stats } from './../objects/statistic'
import { BaseController, Route, NextFunction } from './'
import { Todo } from '../models'
import { Unit } from '../objects/unit'
import { Resources } from '../objects/resource'

export class TestController extends BaseController {

  static basePath = '/test'

  static routes: Route[] = [
    { path: '/', action: 'rootIndex', root: true },
    { path: '/', action: 'index' },
    { verb: 'post', path: '/', action: 'create' },
  ]

  /**
   * Action qui redirige vers la bonne route
   * 
   * @param {NextFunction} next 
   * @memberof TodoController
   */
  public rootIndex(next: NextFunction) {
    this.res.redirect(301, '/test')
  }

  /**
   * Action qui liste nos Todos
   * 
   * @param {NextFunction} next 
   * @memberof TodoController
   */
  public index(next: NextFunction) {
    const unit = new Unit({
      baseCost: new Map([[Resources.CEREAL, 10], [Resources.MEAT, 20]]),
      stats: new Map([[Stats.ARMOR, 5], [Stats.HEALTH, 50], [Stats.STRENGTH, 10]]),
      name: 'Chinois',
      id: 'Chinois',
      description: 'Un jaune',
      duration: 1500,
    })
    const restaurant = new Restaurant(1)
      
    function strMapToObj(strMap: Map<string, number>) {
      const obj:any = Object.create(null)
      for (const [k, v] of strMap) {
        obj[k] = v
      }
      return obj
    }

    function stringify(key:any, value:any) {
      if (value instanceof Map) {
        return strMapToObj(value)
      }
      return value
    }
      
    this.res.status(200).send(JSON.stringify(unit, stringify))
  }


  /**
   * Action qui créé une Todo
   * 
   * @param {NextFunction} next 
   * @memberof TodoController
   */
  public create(next: NextFunction) {
    console.log(this.req.body)
    const todo = new Todo(this.req.body)

    todo.save().then(() => {
      this.res.json(todo)
    }).catch(next) // On oublie pas le catch !!!!!
  }
}
