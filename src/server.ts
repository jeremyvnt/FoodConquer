import * as express from 'express'
import Unit from './unit'
import Resource from './resource'
import Statistic from './statistic'


const app = express()

app.set('port', 3005)


app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	let unit = new Unit(
		new Map([
			[Resource.RESOURCES.cereal, 10],
			[Resource.RESOURCES.meat, 50],
			[Resource.RESOURCES.water, 30],
		]),
		new Map([
			[Statistic.STATS.armor, 10],
			[Statistic.STATS.health, 300],
			[Statistic.STATS.strength, 30],
		]),
		1000
	)
	res.status(404).send('PD')
})

app.listen(app.get('port'), () => {
	console.log(`Started on port ${app.get('port')}`)
})