import { BaseController, Route, NextFunction } from './'
import { Todo } from '../models'

export class TodoController extends BaseController {

  static basePath = '/todos'

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
    this.res.redirect(301, '/todos')
  }

  /**
   * Action qui liste nos Todos
   * 
   * @param {NextFunction} next 
   * @memberof TodoController
   */
  public index(next: NextFunction) {
    // Ici on doit spécifier à findAll le type de valeur en sortie pour que TypeScript le connaisse
    Todo.findAll<Todo>().then((todos) => {
      console.log('Les todos: ', todos)

      this.res.json(todos)
    }).catch(next) // On oublie pas le catch !!!!!
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
