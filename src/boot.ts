import { Server } from './server'
import { Sequelize } from 'sequelize-typescript'

// On créé une instance de sequalize avec la configuration
const sequelize = new Sequelize({
  database: 'foodconquer',
  dialect: 'mysql',
  username: 'root',
  password: '',
  host: 'localhost',
  modelPaths: [__dirname + '/objects/models'],
})

export const secret = 'foodConquerForTheWin'


// On créé une instance de notre serveur avec une configuration
const server = new Server({
  port: 3002,
})

// On synchronise la base
sequelize.sync().then(() => {
  // Puis on lance le serveur
  server.run()
})


