import * as moment from 'moment'

import { UserRequirement } from './../../objects/models/UserRequirement'
import { UserUnit } from './../../objects/models/UserUnit'
import { Model } from 'sequelize-typescript'


export abstract class UtilService {

  static requirementLater = (delay: number, value: UserRequirement) => {
    setTimeout(
        () => {
          UserRequirement.update({
            level: value.level + 1,
          }, {
            where: {
              requirementId: value.requirementId,
              userId: value.userId,
            },
          }).then((ur) => {
            console.log(new Date().valueOf())
          }).catch((error) => {
            console.log(error)
          })
        }
    , delay, value)
  }

  static unitLater = (delay: number, value: UserUnit, quantity: number) => {
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
