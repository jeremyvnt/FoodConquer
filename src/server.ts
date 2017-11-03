import * as express from 'express'
import Unit from './unit'
import { RESOURCES } from './resource'
import { STATS } from './statistic'


const app = express()

app.set('port', 3005)


app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // console.log(RESOURCES)
  const unit = new Unit(
    new Map([
      [RESOURCES.CEREAL, 10],
      [RESOURCES.MEAT, 50],
      [RESOURCES.WATER, 30],
    ]),
    new Map([
      [STATS.armor, 10],
      [STATS.health, 300],
      [STATS.strength, 30],
    ]),
    1000)
  res.status(200).send(JSON.stringify(unit))
})

app.listen(app.get('port'), () => {
  console.log(`Started on port ${app.get('port')}`)
})
