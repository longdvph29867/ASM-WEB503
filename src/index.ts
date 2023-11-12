import express, { Request, Response } from 'express'
const app = express()

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200)
})

app.listen(8000, () => console.log('123'))
