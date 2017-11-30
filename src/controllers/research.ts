import { User, Requirement, UserRequirement, RequirementResource } from '../models'
import { ResourcesService } from '../core/utils/resources'
import { BaseController, Route, NextFunction } from './'

export class ResearchController extends BaseController {

  private basePath = '/research'
  private requirementType = 'RESEARCH'

  static routes: Route[] = [
    { path: '/', action: 'index' },
    //{ verb: 'post', path: '/', action: 'create' },
  ]

	/**
	 * Action qui liste les différentes recherches
	 * 
	 * @param {NextFunction} next 
	 * @memberof ResearchController
	 */
  public index(next: NextFunction) {
    this.getRequirementList(next, this.requirementType)
  }
}
