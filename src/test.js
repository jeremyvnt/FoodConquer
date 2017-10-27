import * as http from 'http'
import Unit from './unit'

http.createServer((req, res) => {
 	let unit = new Unit('555', 'TRES FORT', '9999', null)
 	res.write(unit.duration)
 	res.end()
}).listen(8081)