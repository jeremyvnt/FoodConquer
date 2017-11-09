import { BaseController, Route, NextFunction } from './'
import { Todo } from '../models'
import { Unit } from '../objects/unit'
import { Resources as RESOURCES } from '../objects/resource'

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
    const unit = new Unit(
    new Map([
      [RESOURCES.CEREAL, 10],
      [RESOURCES.MEAT, 50],
      [RESOURCES.WATER, 30],
    ]),
    new Map([
      [STATS.armor, 10],
      [STATS.health, 300],
      [STATS.strength, 30],
    ]),
    1000)
    res.status(200).send(JSON.stringify(unit))
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
