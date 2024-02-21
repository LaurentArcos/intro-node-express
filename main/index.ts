import {Request, Response} from 'express-serve-static-core'
import express from 'express'
import usersRoute from './routes/usersRoute'
import moviesRoute from './routes/moviesRoute'



express.urlencoded({
  extended : false
})

const port:number = 3000
const app = express()




app.get('/', (req : Request, res : Response) => {
  res.send('Welcome to our first API using node')
})


app.use('/api', usersRoute, moviesRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})