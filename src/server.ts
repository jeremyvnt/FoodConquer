import * as express from 'express'

const app = express()

app.set('port', process.env.PORT || 3000)

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send('Not Found')
})

app.listen(app.get('port'), () => {
    console.log(`Started on port ${app.get('port')}')
})