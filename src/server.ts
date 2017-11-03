import * as express from 'express'
import { Unit } from './unit'
import { Resources } from './resource'
import { Stats } from './statistic'


const app = express()

app.set('port', 3005)


app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // console.log(RESOURCES)
  const unit = new Unit({
    baseCost: new Map([[Resources.CEREAL, 10], [Resources.MEAT, 20]]),
    stats: new Map([[Stats.ARMOR, 5], [Stats.HEALTH, 50], [Stats.STRENGTH, 10]]),
    name: 'Chinois',
    description: 'Un jaune',
    duration: 1500,
  })

  function strMapToObj(strMap: Map<string, number>) {
    const obj:any = Object.create(null)
    for (const [k, v] of strMap) {
      obj[k] = v
    }
    return obj
  }

  function stringify(key:any, value:any) {
    if (value instanceof Map) {
      return strMapToObj(value)
    }
    return value
  }

  res.status(200).send(JSON.stringify(unit, stringify))
})

app.listen(app.get('port'), () => {
  console.log(`Started on port ${app.get('port')}`)
})
