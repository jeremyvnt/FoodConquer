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
    { verb: 'get', path: '/:unitId', action: 'details' },
    { verb: 'post', path: '/:unitId', action: 'create' },
  ]

	/**
	 * Action qui liste les différentes unités
	 * 
	 * @param {NextFunction} next
	 * @memberof UnitController
	 */
  public async index(next: NextFunction) {
    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
    const units = await this.unitService.getUnits(user)
    this.res.json(units)
  }

	/**
	 * Action qui liste les différents buildings
	 * 
	 * @param {NextFunction} next
	 * @memberof UnitController
	 */
  public async details(next: NextFunction) {
    const unitId = this.req.params.unitId
    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
    const unit = await Unit.findOne<Unit>(
      {
        where: {
          id: unitId,
        },
      },
    )
    const userUnit = <UserUnit[]>await unit.$get(
      'userUnits',
      {
        where: {
          userId: user.id,
        },
      },
    )
    const updatedAt = userUnit.length ? userUnit[0].updatedAt : 0

    // TODO
    const cost: number[] = null // await this.resourcesService.getUpgradeCost(user, unit, level)
    const buildDuration = await this.requirementService.getBuildingTime(
      user,
      4,// cost[Resources.CEREAL],
      2,// cost[Resources.MEAT],
    )

    const { id, name, description, type } = unit
    const unitResult = { id, name, type, description, updatedAt, cost, buildDuration }
    this.res.json(unitResult)
  }

  /**
   * Action créé une nouvelle unité
   * 
   * @param {NextFunction} next 
   * @memberof BuildingController
   */
  public async create(next: NextFunction) {
    const unitId = this.req.params.unitId

    const user = await User.findOne<User>({ where: { pseudo: 'Jerem' } })
    const unit = await Unit.findOne<Unit>({ where: { id: unitId } })
    const userUnit = (<UserUnit[]>await user.$get(
      'units',
      {
        where: {
          unitId,
        },
        include: [{
          model: Unit,
          where: {
            type: unit.type,
          },
        }],
      },
    ))

    // await this.requirementService.createRequirement(user, unitId)
    // await this.unitService.createUnit(user, unitId)
    this.res.redirect(200, UnitController.basePath)
  }
}

