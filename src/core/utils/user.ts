import { User, UserResource, Resource } from '../../models'
import * as bcrypt from 'bcrypt'

export class UserService {

  public async createUser(pseudo: string, password: string, email: string) {
    let newUser = new User()
    newUser.set('pseudo', pseudo)
    newUser.set('email', email)

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    newUser.set('password', hashedPassword)
    newUser = <User>await newUser.save()

    const userCerealResource = new UserResource()
    userCerealResource.set('quantity', 500)
    userCerealResource.set('updatedAt', new Date().valueOf())
    userCerealResource.set('resource', 'cereal')
    userCerealResource.set('userId', newUser.id)
    userCerealResource.save()

    const userMeatResource = new UserResource()
    userMeatResource.set('quantity', 500)
    userMeatResource.set('updatedAt', new Date().valueOf())
    userMeatResource.set('resource', 'meat')
    userMeatResource.set('userId', newUser.id)
    userMeatResource.save()

    const userWaterResource = new UserResource()
    userWaterResource.set('quantity', 500)
    userWaterResource.set('updatedAt', new Date().valueOf())
    userWaterResource.set('resource', 'water')
    userWaterResource.set('userId', newUser.id)
    userWaterResource.save()

    const userMoneyResource = new UserResource()
    userMoneyResource.set('quantity', 500)
    userMoneyResource.set('updatedAt', new Date().valueOf())
    userMoneyResource.set('resource', 'money')
    userMoneyResource.set('userId', newUser.id)
    userMoneyResource.save()

    return newUser
  }

  public comparePassword(user: User, actualPassword: string, callback: any) {
    bcrypt.compare(actualPassword, user.password, ((err, isMatch) => {
      if (err)
        return callback(err)

      callback(null, isMatch)
    }))
  }
}
