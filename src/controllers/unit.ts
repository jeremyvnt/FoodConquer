import { Resources } from './../objects/resource'
import { buildingTime } from './../core/utils/formula'
import { User, Requirement, UserRequirement, RequirementResource, Unit, UserUnit } from '../models'
import { UnitService } from './../core/utils/unit'
import { BaseController, Route, NextFunction } from './'

export class UnitController extends BaseController {

  static basePath = '/unit'
  private unitService = new UnitService()

  static routes: Route[] = [
    { path: '/', action: 'index' },
    { verb: 'post', path: '/:unitId', action: 'create' },
  ]

	/**
	 * Action qui liste les différentes unités
	 * 
	 * @param {NextFunction} next
	 * @memberof UnitController
	 */
  public async index(next: NextFunction) {
    try {
      const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
      const resources = await this.resourcesService.getUserResources(user)
      const units = await this.unitService.getUnits(user)
      this.res.json({ resources, units })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Action créé une nouvelle unité
   * 
   * @param {NextFunction} next 
   * @memberof BuildingController
   */
  public async create(next: NextFunction) {
    const unitId = this.req.params.unitId
    const quantity = this.req.body.quantity

    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
    const unit = await Unit.findOne<Unit>({ where: { id: unitId } })
    try {
      await this.unitService.createUnits(user, unit, quantity)
      this.res.redirect(200, UnitController.basePath)
    } catch (error) {
      next(error)
    }
  }
}

