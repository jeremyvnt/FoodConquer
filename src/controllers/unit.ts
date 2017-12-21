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
      const user = this.req.user
      const resources = await this.resourcesService.getUserResources(user)
      const units = await this.unitService.getUnits(user)
      return { resources, units }
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

    const user = this.req.user
    const unit = await Unit.findOne(unitId)
    
    await this.unitService.createUnits(user, unit, quantity)
    return {result: 'ok'}
  }
}

