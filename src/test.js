import * as http from 'http'
import Unit from './unit'

http.createServer((req, res) => {
 	let unit = new Unit('555', '9999', null, 'TRES FORT')
 	res.write(unit.duration)
 	res.end()
}).listen(8081)