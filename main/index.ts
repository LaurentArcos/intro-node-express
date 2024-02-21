import {Request, Response} from 'express-serve-static-core'
import express from 'express'

const port:number = 3000
const app = express()


app.get('/', (req : Request, res : Response) => {
  res.send('Welcome to our first API using node')
})

app.get('/users', (req : Request, res : Response) => {
  res.send('Users route')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})