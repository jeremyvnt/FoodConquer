import * as moment from 'moment'

import { UserRequirement } from './../../objects/models/UserRequirement'
import { UserUnit } from './../../objects/models/UserUnit'
import { Model } from 'sequelize-typescript'


export class UtilService {

  requirementLater = (timestamp: number, value: UserRequirement) => {
    const delay: number =  moment.duration(timestamp - moment.now()).asMilliseconds()
    setTimeout(
        () => {
          UserRequirement.update({
            level: value.level + 1,
          }, {
            where: {
              requirementId: value.requirementId,
              userId: value.userId,
            },
          })
        }
    , delay, value)
  }

  unitLater = (timestamp: number, value: UserUnit, quantity: number) => {
    const delay: number =  moment.duration(timestamp - moment.now()).asMilliseconds()
    for (let i = 0; i < quantity; i++) {
      setTimeout(
        () => {
          UserUnit.update({
            level: value.level + 1,
          }, {
            where: {
              unitId: value.unitId,
              userId: value.userId,
            },
          })
        }
    , delay * i, value)  
    }
    
  }    
}
