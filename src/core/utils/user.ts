import { User, UserResource, Resource } from '../../models'
import bcrypt from 'bcrypt-nodejs'

export class UserService {

  public async createUser(pseudo: string, password: string, email: string) {
    const newUser = new User()
    let hashedPassword: string
    newUser.set('pseudo', pseudo)
    newUser.set('email', email)

    bcrypt.genSalt(10, ((err, salt) => {
      if (err)
        throw err

      bcrypt.hash(password, salt, null, ((err, hash) => {
        if (err)
          throw err
        hashedPassword = hash
      }))
    }))
    newUser.set('password', hashedPassword)
    newUser.save()

    const userCerealResource = new UserResource()
    userCerealResource.set('quantity', 500)
    userCerealResource.set('updatedAt', new Date().valueOf())
    userCerealResource.set('resource', 'cereal')
    userCerealResource.$set('user', newUser)
    userCerealResource.save()

    const userMeatResource = new UserResource()
    userMeatResource.set('quantity', 500)
    userMeatResource.set('updatedAt', new Date().valueOf())
    userMeatResource.set('resource', 'meat')
    userMeatResource.$set('user', newUser)
    userMeatResource.save()

    const userWaterResource = new UserResource()
    userWaterResource.set('quantity', 500)
    userWaterResource.set('updatedAt', new Date().valueOf())
    userWaterResource.set('resource', 'water')
    userWaterResource.$set('user', newUser)
    userWaterResource.save()

    const userMoneyResource = new UserResource()
    userMoneyResource.set('quantity', 500)
    userMoneyResource.set('updatedAt', new Date().valueOf())
    userMoneyResource.set('resource', 'money')
    userMoneyResource.$set('user', newUser)
    userMoneyResource.save()
  }

  public comparePassword(user: User, actualPassword: string, callback: any) {
    bcrypt.compare(actualPassword, user.password, ((err, isMatch) => {
      if (err)
        return callback(err)

      callback(null, isMatch)
    }))
  }
}
