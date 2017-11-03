import { Server } from './server'
import { Sequelize } from 'sequelize-typescript'

// On créé une instance de sequalize avec la configuration
const sequelize =  new Sequelize({
  database: 'some_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  modelPaths: [__dirname + '/models'],
})

// On créé une instance de notre serveur avec une configuration
const server = new Server({
  port: 3000,
})

// On synchronise la base
sequelize.sync().then(() => {
  // Puis on lance le serveur
  server.run()
})

